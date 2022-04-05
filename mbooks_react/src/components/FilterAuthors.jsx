import React from 'react'
import OneBook from './OneBook';

import "./OneBook.css"

const FilterAuthors = ({books}) => {

    

  return (
            <div className="all-books">
                {books==null ? <></> :  books.map((book)=>(
                    <OneBook  book={book} key={book.id} />
                ))}
            </div>
  )
}

export default FilterAuthors