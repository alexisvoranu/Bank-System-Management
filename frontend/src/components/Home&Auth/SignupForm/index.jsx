import React, { useState } from 'react';
import "./style.css";
import { SERVER_URL } from '../../../constants';

const SignupForm = () => {

    const [name, setName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState({ show: false, type: '', message: '' });

    const onChangeName = (event) => {
        setName(event.target.value)
    }

    const onChangeBirthDate = (event) => {
        setBirthDate(event.target.value)
    }

    const onChangePhone = (event) => {
        setPhone(event.target.value)
    }

    const onChangeEmail = (event) => {
        setEmail(event.target.value)
    }

    const onChangePassowrd = (event) => {
        setPassword(event.target.value)
    }

    const handleSignup = (event) => {
        event.preventDefault()
        signup()
    }

    const signup = () => {
        const userDetails = {
            name: name,
            birthDate: birthDate,
            phone: phone,
            email: email,
            password: password
        }

        let signUpURL = SERVER_URL;
        signUpURL += "/persons/create"
        

        fetch(signUpURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userDetails)
        })
            .then(res => {
                switch (res.status) {
                    case 404:
                        setAlert
                            ({ show: true, type: 'alert-warning', message: 'Missing name, phone, email or password!' });
                        break;
                    case 400:
                        setAlert
                            ({ show: true, type: 'alert-danger', message: 'Email already in use!' });
                        break;
                    case 201:
                        setAlert

                            ({ show: true, type: 'alert-success', message: 'Account created successfully!' });
                        break;
                }

                //pentru a face alerta sa dispara dupa o secunda
                setTimeout(() => {
                    setAlert({ show: false, type: '', message: '' });
                }, 1000);


            })

            .catch(error => {
                console.error('Error: '.error);
                setAlert({ show: true, type: 'alert-info', message: 'An error ocurred while creating the account!' });;
                setTimeout(() => {
                    setAlert({ show: false, type: '', message: '' });
                }, 1000);
            })
    }


    return (
        <>

            {/* Formular de înregistrare */}
             <form className='signup-form' onSubmit={handleSignup}>
                <div className="mx-auto col-md-3 Inputform FirstForm">
                <label htmlFor="floatingInput" className="form-label">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Isvoranu Alexandru"
                        required
                        onChange={onChangeName}
                    />
                   
                </div>
                <div className="mx-auto col-md-3 Inputform">
                <label htmlFor="birthDate" className="form-label">Birth Date</label> 
                    <input
                        type="date"
                        className="form-control"
                        id="birthDate"
                        onChange={onChangeBirthDate}
                        required
                    />
                    
                </div>
                <div className="mx-auto col-md-3 Inputform">
                <label htmlFor="floatingInput" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="name@example.com"
                        required
                        onChange={onChangeEmail}
                    />
                    
                </div>
                <div className="mx-auto col-md-3 Inputform">
                <label htmlFor="floatingInput" className="form-label">Phone</label>
                    <input
                        type="number"
                        className="form-control"
                        id="phone"
                        placeholder="07201234567"
                        required
                        onChange={onChangePhone}
                    />
                   
                </div>
                <div className="mx-auto col-md-3 Inputform">
                <label htmlFor="floatingPassword" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        required
                        onChange={onChangePassowrd}
                    />
                   
                </div> 

                <button
                    type="submit"
                    className="btn btn-primary mb-3 btn-create-account"
                >
                    Create account
                </button>
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

export { SignupForm };

