
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


function App() {
    const [token,setToken]=useState();

    function addToken(auth_token){
        setToken(auth_token);
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




    return (
    <BrowserRouter className="App">
        <Routes>
            <Route path="/" element={<NavBar token={token}/>}>

                <Route path="/login" element={<LoginPage addToken={addToken}/>}/>  
            
                <Route path="/register" element={<RegisterPage/>}/> 
            
                <Route path="books" element={<BooksPage readMore={readMore}  />}/> 

                <Route path="/details" element = {<BookDetails book={bookDetails}/>}/> 
         
               

                <Route path="/contact" element={<Contact /> }/>

            </Route>

        </Routes>
        

    </BrowserRouter>
    )
}

export default App;
