import React from 'react'
import classes from './StateChanger.module.css'

const StateChanger = (props) => {
  let state = props.state;
  let changeState = props.sendCommand
  console.log(state.isLocked)
  

  return (
    <div className={classes.flexRow}>
      <h1>STATE:</h1>
      <button 
        onClick={()=>{changeState("Close")}}
        className={state.isLocked === "True" ? classes.activeBtn : classes.deactiveBtn}>
        Locked
      </button>
      <button 
        onClick={()=>{changeState("Open")}}
        className={state.isLocked === "True" ? classes.deactiveBtn : classes.activeBtn}>
        Unlocked
      </button>
    </div>
  )
}

export default StateChanger