import React, { useState } from 'react';
import "./style.css";
import { SERVER_URL } from '../../../constants';

const CreateAccountForm = () => {

    const [iban, setIban] = useState("");
    const [dateOpened, setDateOpened] = useState("");
    const [currency, setCurrency] = useState("");
    const [value, setValue] = useState("");
    const [type, setType] = useState("");
    const [alert, setAlert] = useState({ show: false, type: '', message: '' });

    const onChangeIban = (event) => {
        setIban(event.target.value)
    }

    const onChangeDateOpened = (event) => {
        setDateOpened(event.target.value)
    }

    const onChangeCurrency = (event) => {
        setCurrency(event.target.value)
    }

    const onChangeValue = (event) => {
        setValue(event.target.value)
    }

    const onChangeType = (event) => {
        setType(event.target.value)
    }

    const handleCreate = (event) => {
        event.preventDefault()
        create()
    }

    const create = () => {
        const accountDetails = {
            iban: iban,
            dateOpened: dateOpened,
            currency: currency,
            value: 0,
            type: type
        }

        let createURL = SERVER_URL;
        createURL += "/accounts/create"
        

        fetch(createURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(accountDetails)
        })
            .then(res => {
                switch (res.status) {
                    case 404:
                        setAlert
                            ({ show: true, type: 'alert-warning', message: 'Missing iban, dateOpened, currency or type!' });
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
             <form className='signup-form' onSubmit={handleCreate}>
               
                <div className="mx-auto col-md-3 Inputform">
                <label htmlFor="Currency" className="form-label">Currency</label>
                <select class="custom-select my-1 mr-sm-2" id="Currency">
                    <option selected>Choose...</option>
                    <option value="1">RON</option>
                    <option value="2">EUR</option>
                    <option value="3">USD</option>
                    <option value="3">GBP</option>
                </select>
                   
                </div>
                <div className="mx-auto col-md-3 Inputform">
                <label htmlFor="Type" className="form-label">Account type</label>
                <select class="custom-select my-1 mr-sm-2" id="Type">
                    <option selected>Choose...</option>
                    <option value="1">Current account</option>
                    <option value="2">Deposit account</option>
                    <option value="3">Savings account</option>
                </select>
                   
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

export { CreateAccountForm };

