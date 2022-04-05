import React from 'react'
import { Link } from 'react-router-dom';
import "./OneBook.css"
import {FaRegHeart} from "react-icons/fa"
import {AiOutlineShoppingCart} from "react-icons/ai"
// import "../../../mbooks_images"


const OneBook = ({book,readMore,addToCart}) => {
  return (
    <div className='book'>
        <img className='book-img-top' src={book.image} alt="Book"/>
        <div className='book-body'>
            <h3 className='book-title'>{book.title}</h3>
            <h5 className='book-author'>{book.author.name}</h5> 
            <Link to="/details" className='link' onClick={()=> readMore(book.id)}>Details</Link>
        </div>
        <button className="book-button" >
            <FaRegHeart/>
        </button>
        <button className="book-button" onClick={()=> addToCart(book.id)}>
            <AiOutlineShoppingCart/>
        </button>
    </div>

  )
}

export default OneBook













