import React, { useEffect, useState } from 'react'
import useWebSocket from 'react-use-websocket'
import Header from './components/Header'
import VideoDisplay from './components/VideoDisplay'
import VideoControls from './components/VideoControls'
import classes from './App.module.css'
import StateChanger from './components/StateChanger'
import PasswordReset from './components/PasswordReset'
import RfidRegister from './components/RfidRegister'
import Popup from './components/Popup'
import Login from './components/Login'

//GLOBAL VARIABLES
const VIDEO_WS = 'ws://192.168.100.16:5002'
const COMMAND_WS = 'ws://localhost:5001'

////////////////////


const App = () => {
  //COMMAND CONNECTION ESTABLISHER
  
  const commandServer = useWebSocket(COMMAND_WS, {
    onOpen: () => {
      console.log('Command connection opened')
      //console.log(commandServer)
      //ommandServer.sendMessage(JSONOBJ)
    },
    onMessage: (event) =>{
      handleMessage(event)
    },
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: (closeEvent) => true,
  });
  ////////////////////

  //VIDEO STREAM CONNECTION
  const videoServer = useWebSocket(VIDEO_WS, {
    onOpen: () => {
      console.log('Video connection opened')
    },
    onMessage: (event) =>{
      //console.log(event.data)
      //setFrame(event.data)

    },
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: (closeEvent) => true,
  });

  //INCOMING MESSAGE HANDLER
  const handleMessage = (event) => {
    try{
      console.log("Received", event.data)
      let response = JSON.parse(event.data)
      
      switch(response.type){

        //EVENT HANDLER
        case 'Event':{
          console.log("event", response.data)

          switch (response.data.NewState){
            case 'Open':{
              setState((prev) => {return {...prev, isLocked:"False"}})
              console.log(state)
              break;
            }

            case 'Close':{
              setState((prev) => {return {...prev, isLocked:"True"}})
              console.log(state)
              break;
            }

            case 'AlarmOn':{
              setState((prev) => {return {...prev, alarmOn:"True"}})
              console.log(state)
              break;
            }

            case 'AlarmOff':{
              setState((prev) => {return {...prev, alarmOn:"False"}})
              console.log(state)
              break;
            }

            case 'LightOn':{
              setState((prev) => {return {...prev, lightOn:"True"}})
              console.log(state)
              break;
            }

            case 'LightOff':{
              setState((prev) => {return {...prev, lightOn:"False"}})
              console.log(state)
              break;
            }
          }
          break;
        }

        //RESPONSE HANDLER
        case 'Response':{

          switch(response.name){
            case 'RegisterRFID':{
              if(response.data.status === 'ok'){
                activatePopup("RFID card registered!")
              }else if(response.data.status === 'error'){
                activatePopup("Ups! An error occured, please try again!")
              }else if(response.data.status === 'ready'){
                activatePopup("Ready to go! Hold the card near the reader.")
              }else{
                console.log("Unknown 'RegisterRFID' status response")
              }
              break;
            }

            case 'ChangeKeypadPassword':{
              if(response.data.status === 'ok'){
                activatePopup("New password was succesfully set!")
              }else if(response.data.status === 'wrongpass'){
                activatePopup("Wrong password!")
              }else if(response.data.status === 'badpass'){
                activatePopup("Wrong password format! The password should only contain numbers from 1-9 and contain a minimum of 3 numbers.")
              }else{
                console.log("Unknown 'ChangeKeypadPassword' status response")
              }
              break;
            }

            case 'Login':{
              if(response.data.status === 'ok'){
                setLogedIn(1)
              }else if(response.data.status === 'wronglogin'){
                activatePopup("Wrong username or password!")
              }else{
                activatePopup("Unknown 'Login' status response")
              }
              break;
            }
            break;
          }
          break;
        }
        
        //UNKNOWN RESPONSE
        default:
          console.log(`Response type unknown:${response.type}`)
      }

    }catch(err){
      console.log(err)
    }
    
  }
  ////////////////////

  //MESSAGE SENDER
  const wsSendMessage = (name, data='') => {
    let msg = `{"type":"command", "name":"${name}", "data": {${data}}}`
    commandServer.sendMessage(msg)
    console.log("Sent: ",msg)
  }

  const wsSendMessageVideoServer = (name, data='') => {
    let msg = `{"type":"command", "name":"${name}", "data": {${data}}}`
    videoServer.sendMessage(msg)
    console.log("Sent: ",msg)
  }
  ////////////////////

  //APP STATE VARIBLES
  const [state, setState] = useState({isLocked:true , lightOn: false, alarmOn: true})
  const [message, setMessage] = useState('This is a message from me the smart lock!')
  const [popupActive, setPopupActive] = useState(false)
  const [popupType, setPopupType] = useState('NORMAL')
  const [logedin, setLogedIn] = useState(0)
  const [frame, setFrame] = useState('None')
  const [videoOn, setVideoOn] = useState('False')

  console.log('app')
  ////////////////////

  useEffect(() => {
    if(state.alarmOn === "True"){
      activateAlarm()
    }
  }, [state])


  //POP-UP UTILITY FUNCTIONS
  const disablePopup = () => {
    setMessage('')
    setPopupActive(false)
    setPopupType('NORMAL')
  }

  const activatePopup = (message) => {
    setPopupType('NORMAL')
    setMessage(message)
    setPopupActive(true)
  }

  const activateAlarm = () => {
    setPopupType('ALARM')
    setMessage('SMART LOCK: Somebody is stealing me HEEEELP!')
    setPopupActive(true)
  }

  const deactivateAlarm = () => {
    setState({
      ...state,
      alarmOn: 'False'
    })
    wsSendMessage("AlarmOff")
    disablePopup()
  }

  ////////////////////
  //AUTH UTILITY FUNCTIONS
  const sendAuthData = (user, pass) => {
    wsSendMessage("Login", `"Username":"${user}", "Password":"${pass}"`)
    wsSendMessageVideoServer("Login", `"Username":"${user}", "Password":"${pass}"`)
  }
  ////////////////////


  return (
    <div className={classes.appWrapper}>
      <Header />
      {!logedin ? <Login sendLoginInfo = {sendAuthData} /> : <></>}
      {logedin ? <div className={classes.grid}>
        <div className={classes.box1}><VideoDisplay sendCommand = {wsSendMessage} imgSrc = {frame} videoOn = {videoOn}/></div>
        <div className={classes.box2}><VideoControls sendCommand = {wsSendMessage} setVideoState = {setVideoOn} state = {state} imgSrc = {frame} videoOn = {videoOn}/></div>
        <div className={classes.box3}><StateChanger sendCommand = {wsSendMessage} state = {state}/></div>
        <div className={classes.box4}><PasswordReset activatePopup = {activatePopup} sendCommand = {wsSendMessage}/></div>
        <div className={classes.box5}><RfidRegister activatePopup = {activatePopup} sendCommand = {wsSendMessage}/></div>
      </div> : <></>}
      {popupActive ? <Popup setAlarmOff = {deactivateAlarm}  message = {message} type = {popupType}/> : <></>}
    </div>
  )
}

export default App