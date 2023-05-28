import React, {useRef} from 'react'
import classes from "./Login.module.css"

const Login = (props) => {
    const passRef = useRef()
    const userRef = useRef()
    const handleClick = (e) => {
        e.preventDefault()
        props.sendLoginInfo(userRef.current.value,passRef.current.value)
    }
    
    
  return (
    <div className={classes.loginWrapper}>
        <form className={classes.flexcol}>
        <div className={classes.flexrow}>
          <label>Username:</label>
          <input type="text" ref={userRef}></input>
        </div>

        <div className={classes.flexrow}>
          <label>Password:</label>
          <input type="password" ref={passRef}></input>
        </div>

        <div className={classes.flexrowBtn}>
          <button
          onClick = {handleClick} 
          className={classes.resetBtn}>
            Login
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login