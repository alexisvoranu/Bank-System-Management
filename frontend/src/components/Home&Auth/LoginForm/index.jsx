import React, { useState } from 'react';
import "./style.css";
import { SERVER_URL } from '../../../constants.js';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState({ show: false, type: '', message: '' });

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleLogin = (event) => {
        event.preventDefault();
        login()
    }

    const login = () => {
        const userDetails = {
            email: email,
            password: password
        };
    
        let loginURL = SERVER_URL;
    
        loginURL += "/persons/login";
        
    
        fetch(loginURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userDetails)
        })
        .then(async res => {
            const data = await res.json(); 
            if (res.ok) {
                
                localStorage.setItem('userDetails', JSON.stringify(data));
                navigate('/home');
                
            } else {
                throw new Error(data.message || 'An error occurred while trying to authenticate you!');
            }
        })
        .catch(error => {
            // Afișează un mesaj de eroare ca notificare
            setAlert({ show: true, type: 'alert-danger', message: error.message });
            setTimeout(() => {
                setAlert({ show: false, type: '', message: '' });
            }, 1000);
        });
    }

    return (
        <>
            <form className="LoginForm" onSubmit={handleLogin}>
            <div className="mx-auto col-md-3 LoginDiv">
                <label className="label" htmlFor="email">Email address</label>
                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="someone@email.com" onChange={onChangeEmail}/>
            </div>
            <div className="mx-auto col-md-3 LoginDiv">
                <label className="label" htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Password" onChange={onChangePassword}/>
            </div>
            <button id="btnSubmit" type="submit" className="btn btn-primary">Login</button>
            </form>

            {/* Alert container */}
            {alert.show && (
                <div className={`alert ${alert.type} d-flex align-items-center`} role="alert">
                    <div>
                        {alert.message}
                    </div>
                </div>
            )}
        </>

    )
}

export { LoginForm };