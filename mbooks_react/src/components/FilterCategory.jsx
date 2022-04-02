import React from 'react'
import OneBook from './OneBook';
import axios from 'axios';

import "./OneBook.css"

const FilterCategory = ({books}) => {

    

  return (
            <div className="all-books">
                {books==null ? <></> :  books.map((book)=>(
                    <OneBook  book={book} key={book.id} />
                ))}
            </div>
  )
}

export default FilterCategory