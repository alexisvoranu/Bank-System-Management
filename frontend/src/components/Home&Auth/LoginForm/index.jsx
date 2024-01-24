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
    
        loginURL += "/login";
        
    
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
            {/* Formular de autentificare */}
            {/* <form className='login-form-fields' onSubmit={handleLogin}>

                <div class="form-floating mb-3">
                    <input
                        type="email"
                        class="form-control"
                        id="email"
                        placeholder="name@example.com"
                        required
                        onChange={onChangeEmail}
                    />
                    <label for="floatingInput">Email address</label>
                </div>
                <div class="form-floating mb-3">
                    <input
                        type="password"
                        class="form-control"
                        id="password"
                        placeholder="Password"
                        required
                        onChange={onChangePassword}
                    />
                    <label for="floatingPassword">Password</label>
                </div>

                <button
                    type="submit"
                    class="btn btn-primary mb-3 btn-login"
                >
                    Login
                </button>
            </form> */}

            <form>
            <div class="mx-auto col-md-6" onSubmit={handleLogin}>
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={onChangeEmail}/>
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="mx-auto col-md-6">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" onChange={onChangePassword}/>
            </div>
            <button id="btnSubmit" type="submit" class="btn btn-primary">Submit</button>
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