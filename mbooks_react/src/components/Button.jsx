import React from 'react'
import "./Button.css"


const SaveDataButton = ({handle, btnName}) => {


  return (
    <button type="submit" className="btn btn-dark btn-sm" onClick={handle}>{btnName}</button>
  )
}

export default SaveDataButton