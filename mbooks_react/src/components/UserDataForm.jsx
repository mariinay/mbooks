import React from 'react'


const UserDataForm = ({currentUser, handleInput}) => {

    function validate(){
        if (currentUser != null && currentUser.user_data != null){
            return currentUser.user_data;
        }else{
            return "";
        }
    }

  return (
      
    <form className="row g-3">
         <div className="col-md-6">
            <label htmlFor="inputName" className="form-label">Name</label>
            <input type="text" className="form-control" id="inputName" name="name" defaultValue = {validate().name} onInput={handleInput} />
        </div>
        <div className="col-md-6">
            <label htmlFor="inputSurname" className="form-label">Surname</label>
            <input type="text" className="form-control" id="inputSurname" name="surname" defaultValue = {validate().surname} onInput={handleInput} />
        </div>
        <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label">Email</label>
            <input type="email" className="form-control" id="inputEmail4" name="email" defaultValue = {validate().email} onInput={handleInput}/>
        </div>
        <div className="col-6">
            <label htmlFor="inputAddress" className="form-label">Address</label>
            <input type="text" className="form-control" id="inputAddress" name="adress" defaultValue = {validate().adress}  onInput={handleInput}/>
        </div>
        <div className="col-md-2">
            <label htmlFor="inputCity" className="form-label">City</label>
            <input type="text" className="form-control" id="inputCity" name="city" defaultValue = {validate().city} onInput={handleInput}/>
        </div>
        <div className="col-md-2">
            <label htmlFor="inputZip" className="form-label">Zip</label>
            <input type="text" className="form-control" id="inputZip" name="postal_code" defaultValue = {validate().postal_code} onInput={handleInput}/>
        </div>
        <div className="col-md-6">
            <label htmlFor="inputPhone" className="form-label">Phone number</label>
            <input type="tel" className="form-control" id="inputPhone" name="phone_number" defaultValue = {validate().phone_number} onInput={handleInput}/>
        </div>

    </form>
    
  )
}

export default UserDataForm