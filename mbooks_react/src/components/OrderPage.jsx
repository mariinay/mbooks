import React, { useState, useEffect } from 'react'
import Button from './Button'
import UserData from './UserData'
import { Link } from "react-router-dom";
import UserDataForm from './UserDataForm';
import OrderData from './OrderData';
import axios from "axios"


const OrderPage = ({currentUser, currentUserData, orderItems, totalPrice, books, cartNum}) => {

  const btnName = "Submit";

  function vlidate(){
    if (currentUser != null && currentUser.user_data != null){
        return currentUser.user_data;
    }else{
        return "";
    }
}

  const[userData, setUserData] =useState({
    name: vlidate().name,
    surname: vlidate().surname,
    email: vlidate().email,
    adress: vlidate().adress,
    city: vlidate().city,
    postal_code: vlidate().postal_code,
    phone_number: vlidate().phone_number,
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

    let userDataForOrder;

    if(currentUserData == null){
      userDataForOrder = addNewData();
    }else{
      userDataForOrder = updateData();
    }
    return userDataForOrder;
}

function addNewData(){
    axios.post("http://127.0.0.1:8000/api/data",userData).
            then((res)=>
            {
                console.log(res.data);
                if(res.data.success===true) {
                    console.log(res.data);
                    return res.data.id;
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
                    return res.data.id;
                }

            }).
            catch((e)=>{console.log(e);});
}

function handleOrder(e){
    e.preventDefault();
    //save user data on save button
    let user_data_id = handleData();

    //save order with user data id on submit button
    const order = {
      price_total: totalPrice,
      item_count: cartNum,
      user_data_id: user_data_id,
    }
    console.log(order);
    /*axios.post("http://127.0.0.1:8000/api/orders",order).
            then((res)=>
            {
                console.log(res.data);
                if(res.data.success===true) {
                    console.log(res.data);
                }

            }).
            catch((e)=>{console.log(e);});*/
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
        <UserDataForm currentUser={currentUser} handleInput={handleInput}/>
      </div>
      <div className='orderButton'>
        <Button handle={handleOrder} btnName={btnName}/>
      </div>

    </div>
  )
}

export default OrderPage