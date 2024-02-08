import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

const UserNavbar = () => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {

    const storedUserDetails = localStorage.getItem("userDetails");
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
  <a className="navbar-brand" id="a1" href="/">AFI Bank</a>
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
    <ul className="navbar-nav mx-auto"> 
      <li className="nav-item">
        <a className="nav-link" onClick={() => navigate("/createAccount")}>
          Create new account
        </a>
      </li>
    </ul>
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <a className="nav-link" onClick={() => navigate('/home')}>Log out</a>
      </li>
    </ul>
  </div>
</nav>

  );
};

export { UserNavbar };
