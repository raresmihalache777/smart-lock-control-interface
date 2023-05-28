import React from 'react'
import classes from'./Popup.module.css'


const Popup = (props) => {
  return (
    <div className={classes.popupWrapper}>
        <div className={classes.overlay}></div>
        <div className={classes.messageBox}>
            <p className={props.type === 'ALARM' ? classes.alarmText : ''}>{props.message}</p>
            <button onClick={props.setAlarmOff} className={classes.closeBtn}>Close</button>
        </div>
    </div>
  )
}

export default Popup