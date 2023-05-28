import React from 'react'
import classes from './VideoControls.module.css'



const VideoControls = (props) => {

  let videoOn = props.imgSrc
  console.log(videoOn)
  let lightOn = props.state.lightOn

  let isConnectedClass = classes.connectedBtn
  let notConnectedClass = classes.notConnectedBtn

  let lightOnClass = classes.ligthBtnOn
  let lightOffClass = classes.ligthBtnOff

  let sendCommand = props.sendCommand


  return (
    <div className = {classes.videoControlsWrapper}>
        <button 
          
          className={videoOn != 'None' ? isConnectedClass : notConnectedClass}>
            {videoOn != 'None' ? 'Turn Off' : 'Turn on'}
        </button>
        <button 
          onClick = {() => lightOn ? sendCommand("LightOff") : sendCommand("LightOn")}
          className={lightOn === 'True' ? lightOnClass : lightOffClass}>
            Light switch
          </button>
    </div>
  )
}

export default VideoControls