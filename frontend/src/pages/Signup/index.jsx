import React, { useState } from 'react';
import "./style.css";
import { SignupForm } from '../../components/Home&Auth/SignupForm';
import { NavbarHome } from '../../components/Home&Auth/NavbarHome';
const Signup = () => {


    return (
        <div className='main'>
            <NavbarHome />
            <SignupForm/>
        </div>

    );
}

export { Signup }