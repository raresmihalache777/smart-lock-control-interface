import React, {useRef} from 'react'
import classes from "./Login.module.css"
import {useState} from 'react'

const Login = (props) => {
    const [formType,setFormType] = useState("login")
    console.log(formType)

    const passRef = useRef()
    const userRef = useRef()

    const changeUserPassRef = useRef()
    const changeUserOldUserRef = useRef()
    const changeUserNewUserRef = useRef()

    const changePassOldRef = useRef()
    const changePassNewRef = useRef()
    const changePassConfRef = useRef()

    const changeUsername = (e) => {
      e.preventDefault()
      setFormType('changeusername')
    }

    const changePassword = (e) => {
      e.preventDefault()
      setFormType('changepassword')
    }

    const changeLogin = (e) => {
      e.preventDefault()
      setFormType('login')
    }

    const handleLogin = (e) => {
        e.preventDefault()
        props.sendLoginInfo(userRef.current.value,passRef.current.value)
    }

    const handleResetUser = (e) => {
      e.preventDefault()
      props.changeUsername(changeUserPassRef.current.value,changeUserOldUserRef.current.value, changeUserNewUserRef.current.value)
    }

  const handleResetPass = (e) => {
    e.preventDefault()
    if(changePassNewRef.current.value !== changePassConfRef.current.value){
        props.activatePopup("Passwords don't match!")
        return
    }
    props.changePassword(changePassOldRef.current.value,changePassNewRef.current.value)
  }
    
    
  return (
    <>
      {(formType === 'login') ? <div className={classes.loginWrapper}>
          <form className={classes.flexcol}>
          <div className={classes.flexrow}>
            <label>Username:</label>
            <input type="text" ref={userRef}></input>
          </div>

          <div className={classes.flexrow}>
            <label>Password:</label>
            <input type="password" ref={passRef}></input>
          </div>

          <div className={classes.flexrowCenter}>
            <button
            onClick = {handleLogin} 
            className={classes.resetBtn}>
              Login
            </button>
          </div>

          <div className={classes.flexrow}>
            <button className={classes.whiteBtn} onClick = {changeUsername}>Change Username</button>
            <button className={classes.whiteBtn} onClick = {changePassword}>Change Password</button>
          </div>
        </form>
      </div> : <></>}

      {(formType === 'changeusername') ? 
      <div className={classes.loginWrapper}>
          <form className={classes.flexcol}>
          <div className={classes.flexrow}>
            <label>Password:</label>
            <input type="password" ref={changeUserPassRef}></input>
          </div>

          <div className={classes.flexrow}>
            <label>Old Username:</label>
            <input type="text" ref={changeUserOldUserRef}></input>
          </div>

          <div className={classes.flexrow}>
            <label>New Username:</label>
            <input type="text" ref={changeUserNewUserRef}></input>
          </div>

          <div className={classes.flexrowCenter}>
            <button
            onClick = {handleResetUser} 
            className={classes.resetBtn}>
              Change Username
            </button>
          </div>

          <div className={classes.flexrowCenter}>
            <button className={classes.whiteBtn} onClick = {changeLogin}>Login</button>
          </div>
        </form>
      </div> : <></>}

      {(formType === 'changepassword') ? 
      <div className={classes.loginWrapper}>
          <form className={classes.flexcol}>
          <div className={classes.flexrow}>
            <label>Old Password:</label>
            <input type="password" ref={changePassOldRef}></input>
          </div>

          <div className={classes.flexrow}>
            <label>New Password:</label>
            <input type="password" ref={changePassNewRef}></input>
          </div>

          <div className={classes.flexrowCenter}>
            <label>Confirm Password:</label>
            <input type="password" ref={changePassConfRef}></input>
          </div>

          <div className={classes.flexrowCenter}>
            <button
            onClick = {handleResetPass} 
            className={classes.resetBtn}>
              Change Password
            </button>
          </div>

          <div className={classes.flexrowCenter}>
            <button className={classes.whiteBtn} onClick = {changeLogin}>Login</button>
          </div>
        </form>
      </div> : <></>}
    </>
  )
}

export default Login