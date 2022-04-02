import React from 'react'
import OneBook from './OneBook';
import axios from 'axios';
import { useState,useEffect } from 'react';
import "./OneBook.css"
import { Link } from 'react-router-dom';




const BooksPage = ({readMore,seeAuthor,seeCategories}) => {

    

    const [books, setBooks]=useState();
    useEffect(()=>{
        if(books==null){
            axios.get("http://127.0.0.1:8000/api/books").then((res)=>{
                console.log(res.data);
                setBooks(res.data.books);
            });
        }
    },[books]);


    const [authors, setAuthors]=useState();
    useEffect(()=>{
        if(authors==null){
            axios.get("http://127.0.0.1:8000/api/authors").then((res)=>{
                console.log(res.data);
                setAuthors(res.data.authors);
            });
        }
    },[authors]);

    const [categories, setCategories]=useState();
    useEffect(()=>{
        if(categories==null){
            axios.get("http://127.0.0.1:8000/api/categories").then((res)=>{
                console.log(res.data);
                setCategories(res.data.categories);
            });
        }
    },[categories]);
   
    
    const [sortedBooks, setSortedBooks]=useState();
    
    
    function sort(){
        books.sort((a,b)=>{
            if (a.title < b.title) {
              return -1;
            }
            if (a.title > b.title) {
              return 1;
            }
            return 0;
          });
        setSortedBooks(books)
    }
    
  
 
    return (
    
        <div className="all-books-page" >
            <h1 style={{marginLeft:23+"px"}}>Books</h1>

            <p>
                <button className="btn btn-primary mb-1" type="button" data-bs-toggle="collapse" data-bs-target="#multiCollapse3" aria-expanded="false" aria-controls="multiCollapse3" style={{backgroundColor:"rgb(33, 37, 41)"}}>Categories</button>
                <button className="btn btn-primary mb-1" type="button" data-bs-toggle="collapse" data-bs-target="#multiCollapse1" aria-expanded="false" aria-controls="multiCollapse1" style={{backgroundColor:"rgb(33, 37, 41)", marginLeft:20+"px"}}>Authors</button>
                <button className="btn btn-primary mb-1" type="button" data-bs-toggle="collapse" data-bs-target="#multiCollapse2" aria-expanded="false" aria-controls="multiCollapse2" style={{backgroundColor:"rgb(33, 37, 41)", marginLeft:20+"px"}}>Search</button>
                <button className="btn btn-primary mb-1" type="button" onClick={sort} style={{backgroundColor:"rgb(33, 37, 41)", marginLeft:20+"px"}}>Sort</button>
            </p>

            

            <div className="row">

                    
                <div className="col">
                    <div className="multi-collapse collapse show" id="multiCollapse3" >
                        {categories==null ? <></> : categories.map((category) => (
                             <li  key={category.id}><Link to="/filterCategories" onClick={()=> seeCategories(category.id)} style={{background:'transparent', borderWidth:0+"px", color:"black"}} >{category.name}</Link></li> ))} 
                                
                    </div>
                </div>

                
                <div className="col">
                    <div className="multi-collapse collapse show" id="multiCollapse1" >
                        {authors==null ? <></> : authors.map((author) => (
                             <li key={author.id}><Link to="/filterAuthors" onClick={()=> seeAuthor(author.id)} style={{background:'transparent', borderWidth:0+"px", color:"black"}} >{author.name}</Link></li>  ))} 
                                     
                    </div>
                </div>

            
                <div className="col">
                    <div className="multi-collapse collapse show" id="multiCollapse2" >
                    <div className="card card-body">
                        Type in a book
                    </div>
                    </div>
                </div>
            </div>




            <div className="all-books">
                {books==null ? <></> :  books.map((book)=>(
                    <OneBook  book={book} key={book.id} readMore={readMore} />
                ))}
            </div>
        </div>
    )
}

export default BooksPage