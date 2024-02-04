import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

const UserNavbar = () => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    //extragem datele utilizatorului
    const storedUserDetails = localStorage.getItem("userDetails");
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <a id="a1">AFI Bank</a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <a className="nav-link" onClick={() => navigate("/createAccount")}>
              Create new account
            </a>
          </li>
        </ul>
        <div className="ms-auto">
          {userDetails && userDetails.userDetails && (
            <span className="navbar-text">{userDetails.userDetails.name}</span>
          )}
        </div>
      </div>
    </nav>
  );
};

export { UserNavbar };
