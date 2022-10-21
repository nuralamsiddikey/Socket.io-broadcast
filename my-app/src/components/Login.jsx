import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from '../style/login.module.css'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { io } from 'socket.io-client';


const Login = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('')

    const handleSubmit = () => {

        if (name === '') {
            toast('Empty name!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            let socket = io("http://localhost:5000")

            socket.emit('setUserName', name)
            socket.on('setUser', (data) => {
                if (data.exist) {
                    toast.error('this name already taken')
                }
                else {
                    navigate(`/chat?name=${data.name}`)
                }
            })


        }
    }



    return (
        <div className={styles.container}>
            <TextField
                onChange={(e) => setName(e.target.value)}
                id="outlined-basic"
                label="Name"
                variant="outlined"
                size="small"
            />
            <Button
                onClick={handleSubmit}
                variant="contained"
            >
                Join Chat
            </Button>

            <ToastContainer />
        </div>
    );
};




export default Login;