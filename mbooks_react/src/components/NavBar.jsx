import React from 'react'
import Mbooks from "../Mbooks.png"
import "./NavBar.css"
import axios from 'axios'
import { Outlet } from 'react-router-dom'

const NavBar = ({token}) => {

    function handleLogout(){

        var config = {
            method: 'post',
            url: 'http://127.0.0.1:8000/api/logout',
            headers: { 
            
            Authorization: "Bearer "+ window.sessionStorage.getItem("auth_token"),
            
            },
            
        };
        
        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            window.sessionStorage.setItem("auth_token",null);
        })
        .catch(function (error) {
            console.log(error);
        });

    }
  return (
    <div>
        <nav className="navbar navbar-expand-xl navbar-dark bg-dark">
            <link rel="stylesheet" href="NavBar.css"></link>
            <div className="container-fluid">
            <img src={Mbooks} style={{height:70+"px", width:70+"px" }} />
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarDark" aria-controls="navbarDark" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse show" id="navbarDark">
                <ul className="navbar-nav me-auto mb-2 mb-xl-0">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/books">Books</a>
                    </li>
                    <li className="nav-item">
                    <   a className="nav-link " href="/favourites">Favourites</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Cart</a>
                    </li> 
                    <li className="nav-item">
                        <a className="nav-link" href="/contact">Contact</a>
                    </li>               
                </ul>
                <ul className="navbar-nav me-auto mb-10 mb-xl-0" style={{paddingLeft:55+"rem"}}>
                {token==null ? (
                        <li className="nav-item">
                            <a className="nav-link" href="/login">Login</a>
                        </li>
                ):(      
                        <li className="nav-item">
                            <a className="nav-link" onClick={handleLogout}>Logout</a>
                        </li>
                )}
                    
                    <li className="nav-item">
                        <a className="nav-link" href="/register">Register</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Profile</a>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
        <Outlet/>
    </div>
  )
}

export default NavBar