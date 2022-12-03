import React, { useState, useEffect } from "react";
import socketIOClient from 'socket.io-client'


const io = socketIOClient("wss://apizawaj.onebaz.com",{ path:'/socket/v1/socketio/',transports: ['polling'], query: { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlT2ZVc2VyIjoiYWRtaW4iLCJpZCI6IjYzNTkxMGVmOGFhZDA5N2RjNTI0YzlkNyIsImtleSI6ImtHc0E2ZDBvcGNXNWZHbmhFekV0QnhqdFd4ZGFpQWdUIiwiaWF0IjoxNjcwMDczMDMwLCJleHAiOjE2ODU2MjUwMzB9.JWaNRLCqIm6k4WYT9oiIzXuNqoWydb4webOGs7rtB9E"  } });


const userName = 'User '+parseInt(Math.random()*10)
function App() {
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])
  const [moderation,setModeration] = useState(true)

  useEffect(() => {


    io.on('admin/receive-message', payload => {

      console.log(payload); 
      //setModeration(setModeration(payload.status))
    })


    return () => {
      if (io) {

        io.disconnect()
      }
    }


  },[])

  const sendMessage = (e) => {
    e.preventDefault();
    console.log(message)
    io.emit('message',{userName,message})
    setMessage('')
  };
  return (
    <div className="App">
      <h1>Test Socket Zawaj Sounnah </h1>

Status de la modération :

      <form onSubmit={sendMessage}>
        <input type="text" name="message"
        placeholder='Type message'
        value={message}
        onChange={(e)=>{setMessage(e.target.value)}}
        required
        ></input>
        <button type='submit'>Send</button>
      </form>
      {chat.map((payload, index)=>{
        return(
          <h3 key={index}> <span>{payload.message}</span></h3>
        )
      })}
    </div>
  );
}

export default App;
