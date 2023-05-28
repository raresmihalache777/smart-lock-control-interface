import React from 'react'
import classes from './RfidRegister.module.css'

const RfidRegister = (props) => {

  const handleClick = (e) => {
    e.preventDefault()
    props.sendCommand("RegisterRFID")
  } 
  return (
    <div className={classes.flexcol}>
      <h1>Register RFID</h1>
      <div className={classes.flexrow}>
        <p>Click & hold the key near the reader:</p>
        <button 
          onClick = {handleClick}
          className={classes.registerBtn}>
          Register now
        </button>
      </div>
    </div>
  )
}

export default RfidRegister