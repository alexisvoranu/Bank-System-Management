import React, {useEffect} from 'react';
import "./style.css";
import { NavbarHome } from '../../components/Home&Auth/NavbarHome';
import { CreateAccountForm } from '../../components/Account/CreateAccount';

const CreateAccount = () => {

    return (
        <div className='home'>
            <NavbarHome/>
            <CreateAccountForm/>
        </div>

    )
}

export { CreateAccount };

