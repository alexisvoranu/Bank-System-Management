import React, { useState, useEffect } from "react";
import "./style.css";
import { UserNavbar } from "../../components/Person/UserNavbar";
import { AccountCard } from "../../components/Account/AccountCard";
import { SERVER_URL } from "../../constants";

const UserHome = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [accountList, setAccountList] = useState(null);
  const [iban, setIban] = useState("");

  useEffect(() => {
    getUserDetailsFromLocalStorage();
  }, []);

  const onChangeIban = (event) => {
    setIban(event.target.value);
  };

  const getUserDetailsFromLocalStorage = () => {
    const storedUserDetails = localStorage.getItem("userDetails");
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
    }
  };

  useEffect(() => {
    getAccounts();
  }, [userDetails]);

  const getAccounts = () => {
    fetch(
      `http://localhost:8080/api/v1/accounts/getAccountsForPerson?personId=1`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => setAccountList(data));
  };

  return (
    <div className="main-organizer">
      {userDetails && <UserNavbar className="navbar-org" />}
      {userDetails && (
        <div className="header-greatings">Welcome, {userDetails.name}</div>
      )}
      {accountList && accountList.length > 0 ? (
        <div className="events-list">
          <div className="list-group lista">
            {accountList.map((account) => (
              <AccountCard key={account.id} {...account} />
            ))}
          </div>
        </div>
      ) : (
        <p className="no-events-message">This event group has no events.</p>
      )}
    </div>
  );
};

export { UserHome };
