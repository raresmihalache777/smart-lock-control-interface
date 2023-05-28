import React from 'react'
import classes from './VideoControls.module.css'



const VideoControls = (props) => {

  let frame = props.imgSrc
  let videoOn = props.videoOn
  //console.log(videoOn)
  let lightOn = props.state.lightOn

  let isConnectedClass = classes.connectedBtn
  let notConnectedClass = classes.notConnectedBtn

  let lightOnClass = classes.ligthBtnOn
  let lightOffClass = classes.ligthBtnOff

  let sendCommand = props.sendCommand

  const handleConnect = (e) => {
    e.preventDefault()
    if(props.videoOn === 'False'){
      props.setVideoState('True')
    }else if(props.videoOn === 'True'){
      props.setVideoState('False')
    }else{
      props.setVideoState('True')
    }
    
  }

  return (
    <div className = {classes.videoControlsWrapper}>
        <button 
          onClick = {handleConnect}
          className={frame != 'None' && videoOn === 'True' ? isConnectedClass : notConnectedClass}>
            {frame != 'None' && videoOn === 'True' ? 'Turn Off' : 'Turn on'}
        </button>
        <button 
          onClick = {() => lightOn === 'True' ? sendCommand("LightOff") : sendCommand("LightOn")}
          className={lightOn === 'True' ? lightOnClass : lightOffClass}>
            Light switch
          </button>
    </div>
  )
}

export default VideoControls