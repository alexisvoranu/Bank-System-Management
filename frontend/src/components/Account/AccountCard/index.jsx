import React, { useEffect, useState } from "react";
import "./style.css";
import { SERVER_URL } from "../../../constants";
import { useNavigate } from "react-router-dom";

const AccountCard = (accountDetails) => {
  return (
    <>
      <div className="card text-bg-info mb-3 principal">
        <div className="card-header">{accountDetails.iban}</div>
        <div className="card-body">
          <h5 className="card-title">{accountDetails.type}</h5>
          <p className="card-text">{accountDetails.dateOpened}</p>
        </div>
      </div>
    </>
  );
};

export { AccountCard };
