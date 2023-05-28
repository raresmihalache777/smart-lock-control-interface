import React from 'react'
import classes from './VideoDisplay.module.css'
import { useRef } from 'react'

const VideoDisplay = (props) => {
  console.log(props.imgSrc, props.videoOn)

  return (
    <div className={classes.videoDisplayWrapper}>
      {props.imgSrc != 'None' && props.videoOn === 'True' ? <img src={`data:image/jpeg;base64,${props.imgSrc}`}/> : <img src={require("../images/sertar.jpeg")}/>}
    </div>
  )
}

export default VideoDisplay