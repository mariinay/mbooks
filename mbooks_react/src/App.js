
import './App.css';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import NavBar from './components/NavBar';
import { useState,useEffect } from 'react';
import BooksPage from './components/BooksPage';
import BookDetails from './components/BookDetails';
import axios from 'axios';
import Contact from './components/Contact';
import FilterAuthors from "./components/FilterAuthors"
import FilterCategory from './components/FilterCategory';
import CartPage from './components/CartPage';
import OrderPage from './components/OrderPage';
import UserData from './components/UserData';
import UserDataUpdate from './components/UserDataUpdate';

function App() {
    const [token,setToken]=useState();

    function addToken(auth_token){
        setToken(auth_token);
    }

    const [users, setUsers]=useState();
    useEffect(()=>{
        if(users==null){
            axios.get("http://127.0.0.1:8000/api/users").then((res)=>{
                console.log(res.data);
                setUsers(res.data.users);
            });
        }
    },[users]);

    const [userData, setUserData] = useState();
    useEffect(()=>{
        if(userData==null){
            axios.get("http://127.0.0.1:8000/api/data").then((res)=>{
                console.log(res.data);
                setUserData(res.data.userData);
            });
        }
    },[userData]);

    //logged user data
    const [currentUserData, setCurrentUserData] = useState();

    
    //logged user
    const [currentUser, setCurrentUser] = useState();

    function addUser(u){ 
        if(users != null){
            users.map((user) =>{
                if(user.email == u.email){
                    setCurrentUser(user);
                    console.log(user);
                    console.log(user.user_data);
                    setCurrentUserData(user.user_data);
                    
                };
            });
        };
    }

    

    function updateUserData(newData){
        setCurrentUserData(newData);
        console.log(newData);
    }


    const [books, setBooks]=useState();
    useEffect(()=>{
        if(books==null){
            axios.get("http://127.0.0.1:8000/api/books").then((res)=>{
                console.log(res.data);
                setBooks(res.data.books);
            });
        }
    },[books]);

    
    const [bookDetails, setBookDetails] = useState();
    const readMore = (id) => {
    books.map((book) => {
      if(book.id === id){
        setBookDetails(book);
      }
    });
  }

  const [favouriteBooks, setFavouriteBooks] = useState();
  useEffect(()=>{
    if(favouriteBooks==null){
        axios.get("http://127.0.0.1:8000/api/favbooks").then((res)=>{
            console.log(res.data);
            setFavouriteBooks(res.data.favouriteBooks);
        });
    }
    },[favouriteBooks]);

    const [authorBooks, setAuthorBooks]=useState([]);
    const seeAuthor = (id) => {
        
        books.map((book) => {
        if(book.author.id === id){
            authorBooks.push(book);
        }
        });
    }

  
    const [categoryBooks, setCategoryBooks]=useState([]);
    const seeCategories = (id) => {
        
        books.map((book) => {
        if(book.category.id === id){
            categoryBooks.push(book);
        }
        });
    }
    
    //number of items in the cart
    const [cartNum, setCartNum] = useState(0); 
    //total price
    const [totalPrice, setTotalPrice] = useState(0);
    //array of order items 
    const[orderItems, setOrderItems] = useState([]);

    //on click add to cart (book id)
    const addToCart = (id) => {
        console.log('add');

        setCartNum(cartNum+1);
        const length = orderItems.length;

        //creating the object order item
        const item = {
            id: length + 1,
            order_id: 0,
            book_id: id,
            quantity: 1
        }

        //adding object to array
        setOrderItems(orderItems => [...orderItems, item]);

        //total price +
        books == null ? <></> : books.map((book)=>(
            book.id == id ? setTotalPrice(totalPrice+(book.price*item.quantity)) : <></>
        ));

        console.log(orderItems);
    };

    //on click remove from cart (item id)
    const removeFromCart = (id) => {
        
        //cart number
        setCartNum(cartNum-1);

        //total price
        let removedItem = null; 
        orderItems.map((item) => (
            item.id == id ? removedItem = item : <></>
        ));
        console.log(removedItem);
        if(books != null){
            books.map((book) => (
                book.id == removedItem.book_id ? setTotalPrice(totalPrice-(book.price*removedItem.quantity)) : <></>
            ));
        };

        //removing from array
        const newArray = orderItems.filter((item) => item.id !== id);
        setOrderItems(newArray);
        
    };


    return (
    <BrowserRouter className="App">
        <Routes>
            <Route path="/" element={<NavBar token={token} setToken={setToken} cartNum={cartNum}/>}>

                <Route path="/login" element={<LoginPage addToken={addToken} addUser={addUser} />}/>  
            
                <Route path="/register" element={<RegisterPage/>}/> 
            
                <Route path="books" element={<BooksPage readMore={readMore} seeAuthor={seeAuthor} seeCategories={seeCategories} addToCart={addToCart} />}/> 

                <Route path="/details" element = {<BookDetails book={bookDetails}/>}/> 

                <Route path="/filterAuthors" element = {<FilterAuthors books={authorBooks} />}/>
                
                <Route path="/filterCategories" element = {<FilterCategory books={categoryBooks} />}/> 

                <Route path="/cart" element = {<CartPage orderItems={orderItems} books={books} totalPrice={totalPrice} removeFromCart={removeFromCart}/>}/> 

                <Route path="/order" element = {<OrderPage currentUser={currentUser} currentUserData={currentUserData} orderItems={orderItems} totalPrice={totalPrice} books={books} cartNum={cartNum} />}/>
         
                <Route path="/contact" element={<Contact /> }/>

                <Route path="/user-data" element={<UserData currentUser={currentUser} /> }/>

                <Route path="/user-data-update" element={<UserDataUpdate currentUser={currentUser} currentUserData={currentUserData} updateUserData={updateUserData}/> }/>

            </Route>

        </Routes>
        

    </BrowserRouter>
    )
}

export default App;
