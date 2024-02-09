import React, { useState, useEffect } from "react";
import "./style.css";
import { UserNavbar } from "../../components/Person/UserNavbar";
import { AccountCard } from "../../components/Account/AccountCard";
import { SERVER_URL } from "../../constants";

const UserHome = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [accountList, setAccountList] = useState(null);

  useEffect(() => {
    getUserDetailsFromLocalStorage();
  }, []);

  const getUserDetailsFromLocalStorage = () => {
    const storedUserDetails = localStorage.getItem("userDetails");
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
    }
  };

  let userId;
  if (userDetails && userDetails.id) {
    userId = parseInt(userDetails.id);
  }

  const getAccounts = () => {
    fetch(`${SERVER_URL}/accounts/getAccountsForPerson?personId=${userId}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => setAccountList(data));
  };

  useEffect(() => {
    if (userDetails) {
      getAccounts();
    }
  }, [userDetails]);

  return (
    <div className="main-organizer">
      {userDetails && <UserNavbar className="navbar-org" />}
      {userDetails && (
        <div className="header-greatings">Welcome, {userDetails.name}</div>
      )}
      {accountList && accountList.length > 0 ? (
        <div className="events-list">
          {accountList.map((account) => (
            <AccountCard
              key={account.id}
              {...account}
              style={{ width: "20%" }}
            />
          ))}
        </div>
      ) : (
        <p className="no-events-message">This event group has no events.</p>
      )}
    </div>
  );
};

export { UserHome };
