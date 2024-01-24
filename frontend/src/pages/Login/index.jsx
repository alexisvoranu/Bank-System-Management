import React, { useState } from 'react';
import "./style.css";
import { NavbarHome } from '../../components/Home&Auth/NavbarHome';
import {LoginForm} from '../../components/Home&Auth/LoginForm';

const Login = () => {

    return (
        <div className='main'>
            <NavbarHome />
            <LoginForm/>
        </div>
    )
}


export {Login}