import React from 'react'
import Button from './Button'
import UserDataForm from './UserDataForm'
import { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const UserDataUpdate = ({currentUser, currentUserData, updateUserData}) => {

    let navigate=useNavigate();

    console.log(currentUser);
    console.log(currentUserData);

    const[userData, setUserData] =useState({
        name: currentUser.user_data != null ? currentUser.user_data.name : "",
        surname: currentUser.user_data != null ? currentUser.user_data.surname : "",
        email: currentUser != null ? currentUser.email : "",
        adress: currentUser.user_data != null ? currentUser.user_data.adress : "",
        city: currentUser.user_data != null ? currentUser.user_data.city : "",
        postal_code: currentUser.user_data != null ? currentUser.user_data.postal_code : "",
        phone_number: currentUser.user_data != null ? currentUser.user_data.phone_number : "",
        user_id: currentUser != null ? currentUser.id : null,
    });
    function handleInput(e){
        let newUserData=userData;
        newUserData[e.target.name]=e.target.value;
        setUserData(newUserData);
    }
    function handleUpdate(e) {

        e.preventDefault();

        if(currentUserData == null){
            addNewData();
        }else{
            updateData();
        }

    }

    function addNewData(){
        axios.post("http://127.0.0.1:8000/api/data",userData).
                then((res)=>
                {
                    console.log(res.data);
                    if(res.data.success===true) {
                        console.log(res.data);
                        updateUserData(userData);
                        navigate("/books");
                    }

                }).
                catch((e)=>{console.log(e);});
    }

    function updateData(){
        axios.put("http://127.0.0.1:8000/api/data/"+currentUserData.id,userData).
                then((res)=>
                {
                    console.log(res.data);
                    if(res.data.success===true) {
                        console.log(res.data);
                        updateUserData(userData);
                        navigate("/books");
                    }

                }).
                catch((e)=>{console.log(e);});
    }

    const btnName = "Save";

  return (
      <div>
        <UserDataForm currentUser={currentUser} handleInput={handleInput} />
        <Button handle={handleUpdate} btnName={btnName}/>
      </div>
    
  )
}

export default UserDataUpdate