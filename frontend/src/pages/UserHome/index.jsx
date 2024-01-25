import React, { useState, useEffect } from 'react';
import "./style.css";
import { UserNavbar } from '../../components/Person/UserNavbar';

const UserHome = () => {

    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
    
        const storedUserDetails = localStorage.getItem('userDetails');
        if(storedUserDetails) {
            setUserDetails(JSON.parse(storedUserDetails))
        }

    }, [])


    return(
        < div className='main-organizer'>
          {userDetails && <UserNavbar className='navbar-org'/>}
          <div className='header-greatings'>Welcome,</div>
          {userDetails && <div className='hello-text'>{userDetails.name}</div>}
        </div>
        
        
    )
}


export {UserHome};