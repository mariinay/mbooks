import React from 'react'
import { Link } from 'react-router-dom';
import "./OneBook.css"
import {FaRegHeart} from "react-icons/fa"
import {AiOutlineShoppingCart} from "react-icons/ai"



const OneBook = ({book,readMore,onAdd}) => {
  return (
    <div className='book'>
        <img className='book-img-top' src="https:/picsum.photos/200" alt="Photo"/>
        <div className='book-body'>
            <h3 className='book-title'>{book.title}</h3>
            <h5 className='book-author'>{book.author.name}</h5> 
            <Link to="/details" className='link' onClick={()=> readMore(book.id)}>Details</Link>
        </div>
        <button className="book-button" >
            <FaRegHeart/>
        </button>
        <button className="book-button">
            <AiOutlineShoppingCart/>
        </button>
    </div>

  )
}

export default OneBook













