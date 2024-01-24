import React, {useEffect} from 'react';
import "./style.css";
import { NavbarHome } from '../../components/Home&Auth/NavbarHome';

const Home = () => {

    return (
        <div className='home'>
            <NavbarHome/>
            <div className='container'>
                <div className='home-header'>Welcome to PI</div>
                <div className='home-text'>A solution for online banking</div>
            </div>
        </div>

    )
}

export { Home };

