import React from 'react'
import classes from './VideoDisplay.module.css'
import { useRef } from 'react'

const VideoDisplay = (props) => {
  //console.log(typeof props.imgSrc)
  return (
    <div className={classes.videoDisplayWrapper}>
      {props.imgSrc != 'None' ? <img src={`data:image/jpeg;base64,${props.imgSrc}`}/> : <img src={require("../images/sertar.jpeg")}/>}
    </div>
  )
}

export default VideoDisplay