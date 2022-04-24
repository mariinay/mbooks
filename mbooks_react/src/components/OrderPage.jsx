import React, { useState, useEffect } from 'react'
import Button from './Button'
import UserData from './UserData'
import { Link } from "react-router-dom";
import UserDataForm from './UserDataForm';
import OrderData from './OrderData';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import {showMessage} from "../services/Alerts";


const OrderPage = ({currentUser, currentUserData, updateUserData, orderItems, totalPrice, books, cartNum}) => {

  const btnName = "Continue";
  let navigate = useNavigate();

  const[userData, setUserData] =useState({
    name: currentUserData != null ? currentUserData.name : "",
    surname: currentUserData != null ? currentUserData.surname : "",
    email: currentUser != null ? currentUser.email : "",
    adress: currentUserData != null ? currentUserData.adress : "",
    city: currentUserData != null ? currentUserData.city : "",
    postal_code: currentUserData != null ? currentUserData.postal_code : "",
    phone_number: currentUserData != null ? currentUserData.phone_number : "",
    user_id: currentUser != null ? currentUser.id : null,
  });

  function handleInput(e){
    let newUserData=userData;
    newUserData[e.target.name]=e.target.value;
    setUserData(newUserData);
  }

  const[orderData, setOrderData] = useState({
    price_total: totalPrice,
    item_count: cartNum,
    user_data_id: null,
  });

  const[newOrderItems, setNewOrderItems] = useState([]);

  function handleData() {

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
                    updateUserData(res.data[1]);
                    navigate("/order-preview");
                }

            }).
            catch((e)=>{
              console.log(e);
              showMessage('Error', 'error', 'center', 3000, false)
            });
}

function updateData(){
    axios.put("http://127.0.0.1:8000/api/data/"+currentUserData.id,userData).
            then((res)=>
            {
                console.log(res.data);
                if(res.data.success===true) {
                    console.log(res.data);
                    updateUserData(res.data[1]);
                    navigate("/order-preview");
                }

            }).
            catch((e)=>{
              console.log(e);
            });
}


function handleOrder(e){
    e.preventDefault();

    let user_data_id = handleData();
    //save user data on save button
    //const user_data_id = await handleData();

    //save order with user data id on submit button
    const order = {
      price_total: totalPrice,   
      item_count: cartNum,
      user_data_id: user_data_id,
    }
    //console.log(order);
    axios.post("http://127.0.0.1:8000/api/orders",order).
            then((res)=>
            {
                console.log(res.data);
                if(res.data.success===true) {
                    console.log(res.data);
                }

            }).
            catch((e)=>{console.log(e);});
    //create new order item array without id and with order id 
    //save order items on confirm button
  };

  return (
    <div className='order'>
      <div className='orderData'>
        <label>1. My cart</label>
        <OrderData orderItems={orderItems} books={books} totalPrice={totalPrice}/>
      </div>
      <div className='userData'>
        <label>2. User data</label>
        <UserDataForm currentUser={currentUser} currentUserData={currentUserData} handleInput={handleInput}/>
      </div>
      <div className='orderButton'>
        <Button handle={handleData} btnName={btnName}/>
      </div>

    </div>
  )
}

export default OrderPage