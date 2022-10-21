import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
const queryString = require('query-string');
const { io } = require("socket.io-client");
let socket

const Chat = () => {
    let [message, setMessage] = useState('')
    let [user, setUser] = useState('')

    const [newMessage, setNewMessage] = useState([])
    const [welcome, setWelcome] = useState('')

    let { search } = useLocation();
    const { name } = queryString.parse(search);
    
  
    useEffect(() => {
        socket = io("http://localhost:5000")
        
        socket.on('newMessage',(data)=>{
         
            setNewMessage(a=>[...a, data])
           
        })
     socket.on('welcome',(data)=>{
            setWelcome(data)
     })
     
    },[])

  const handleMessage = ()=>{
         socket.emit('msg',{message:`${message}`,name:name})
         setMessage('')
  }

 
    return (
        <div>
            <input 
             type="text"
             placeholder='text'
             onChange={(e)=>setMessage(e.target.value)}
            />
            <button onClick={handleMessage}>Send</button>

            <div>
               {newMessage.map(data=>(<div>{data.name}: {data.message}</div>))}
            </div>        
        </div>
    );
};

export default Chat;