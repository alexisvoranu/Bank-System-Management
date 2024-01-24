import React, {useEffect} from 'react';
import "./style.css";
import { NavbarHome } from '../../components/Home&Auth/NavbarHome';

const userHome = () => {

    return (
        <div className='userHome'>
            <NavbarHome/>
            <h1>User Home</h1>
        </div>

    )
}

export { userHome };

