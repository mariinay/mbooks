import React from 'react'
import { Link } from "react-router-dom";

const UserData = ({currentUser}) => {

    console.log(currentUser);

  return (
    <form className="row g-3">
         <div className="col-md-6">
            <label htmlFor="inputName" className="form-label">Name</label>
            <input type="text" className="form-control" id="inputName" value = {currentUser.user_data != null ? currentUser.user_data.name : ""} readOnly />
        </div>
        <div className="col-md-6">
            <label htmlFor="inputSurname" className="form-label">Surname</label>
            <input type="text" className="form-control" id="inputSurname" value = {currentUser.user_data != null ? currentUser.user_data.surname : ""} readOnly />
        </div>
        <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label">Email</label>
            <input type="email" className="form-control" id="inputEmail4" value = {currentUser != null ? currentUser.email : ""} readOnly/>
        </div>
        <div className="col-6">
            <label htmlFor="inputAddress" className="form-label">Address</label>
            <input type="text" className="form-control" id="inputAddress" value = {currentUser.user_data != null ? currentUser.user_data.adress : ""} readOnly />
        </div>
        <div className="col-md-2">
            <label htmlFor="inputCity" className="form-label">City</label>
            <input type="text" className="form-control" id="inputCity" value = {currentUser.user_data != null ? currentUser.user_data.city : ""} readOnly/>
        </div>
        <div className="col-md-2">
            <label htmlFor="inputZip" className="form-label">Zip</label>
            <input type="text" className="form-control" id="inputZip" value = {currentUser.user_data != null ? currentUser.user_data.postal_code : ""} readOnly/>
        </div>
        <div className="col-md-6">
            <label htmlFor="inputPhone" className="form-label">Phone number</label>
            <input type="tel" className="form-control" id="inputPhone" value = {currentUser.user_data != null ? currentUser.user_data.phone_number : ""} readOnly/>
        </div>
        <div className="col-12">
            <Link to='/user-data-update' className="nav-link">Update</Link>
        </div>
    </form>
  )
}

export default UserData