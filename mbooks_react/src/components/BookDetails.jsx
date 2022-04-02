import React from 'react'
import "./BookDetails.css"
import Mbooks from "../Mbooks.png"

const BookDetails = ({book}) => {
  
  return (
    <section className='background'>
      <div className="container py-5 h-100" >
        <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{borderRadius: 1+"rem"}}>
            <div className="card-body p-5 text-center">

               
                    <div className="mb-md-3 mt-md-2 pb-5">
                    

                       
                        <img className='details-img' src={book.image} alt="Photo"  />
                        <p className="title" >{book.title}</p>


                        <div className="form-outline form-white mb-4">
                            <p className="author" >{book.author.name}</p>
                        </div>

                        <div className="form-outline form-white mb-4">
                          <p className="cat" >{book.category.name}</p>
                        </div>

                        <div className="form-outline form-white mb-4">
                          <p className="desc" >{book.description}</p>
                        </div>
                          

                    </div>

                    
               
            </div>
            </div>
        </div>
        </div>
    </div>
    </section>




 
    
  )
}

export default BookDetails
