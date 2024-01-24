import React from 'react';
import './style.css'
import { useNavigate } from 'react-router-dom';

const NavbarHome = () => {

    const navigate = useNavigate();

    return (

    <nav className="navbar navbar-expand-lg navbar-light">
        <a id="a1">PI Bank</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                    <a className="nav-link" onClick={() => navigate('/login')}>Login</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" onClick={() => navigate('/signup')}>Sign Up</a>
                </li>
            </ul>
        </div>
    </nav>




    

    )
}

export { NavbarHome }