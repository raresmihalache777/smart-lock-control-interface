import React from 'react'
import classes from './VideoDisplay.module.css'


const VideoDisplay = (props) => {
  console.log(props.imgSrc, props.videoOn)

  return (
    <div className={classes.videoDisplayWrapper}>
      {props.imgSrc !== 'None' && props.videoOn === 'True' ? <img src={`data:image/jpeg;base64,${props.imgSrc}`} alt=""/> : <img src={require("../images/sertar.jpeg")} alt=""/>}
    </div>
  )
}

export default VideoDisplay