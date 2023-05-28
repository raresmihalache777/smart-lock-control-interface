import React, { useRef } from 'react'
import classes from './PasswordReset.module.css'

const PasswordReset = (props) => {

  let sendCommand = props.sendCommand
  let oldPasRef = useRef();
  let newPasRef = useRef();
  let confPasRef = useRef();

  const activatePopup = props.activatePopup

  function validatePass(){
    console.log(newPasRef,confPasRef)
    if(newPasRef.current.value === confPasRef.current.value){
      return 1
    }else{
      return 'Password mismatch!'
    }
  }

  function handleClick(e){
    e.preventDefault()
    if(validatePass() === 1){
      sendCommand("ChangeKeypadPassword", `"OldPassword": "${oldPasRef.current.value}","NewPassword": "${newPasRef.current.value}"`)
    }else{
      activatePopup(validatePass())
    }
  }

  return (
    <div className={classes.flexcol}>
      <h1>Change Password</h1>
      `<form className={classes.flexcol}>
        <div className={classes.flexrow}>
          <label>Old password:</label>
          <input type="text" ref={oldPasRef}></input>
        </div>

        <div className={classes.flexrow}>
          <label>New password:</label>
          <input type="password" ref={newPasRef}></input>
        </div>

        <div className={classes.flexrow}>
          <label>Confirm new password:</label>
          <input type="password" ref={confPasRef}></input>
        </div>
        <div className={classes.flexrowBtn}>
          <button
          onClick = {handleClick} 
          className={classes.resetBtn}>
            Reset
          </button>
        </div>
      </form>`
    </div>
  )
}

export default PasswordReset