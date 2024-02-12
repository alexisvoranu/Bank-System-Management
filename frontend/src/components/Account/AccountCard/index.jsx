import React, { useEffect, useState } from "react";
import "./style.css";
import { SERVER_URL } from "../../../constants";
import { Link } from "react-router-dom";

const AccountCard = (accountDetails) => {
  let type = "";
  if (accountDetails.type == "current") type = "Current Account";
  else if (accountDetails.type == "deposit") type = "Deposit Account";
  else if (accountDetails.type == "savings") type = "Savings Account";

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const formattedDate = `${day}.${month}.${year}`;

    return formattedDate;
  };

  const openedDate = formatDate(accountDetails.dateOpened);
  const expirationDate = accountDetails.expirationDate;
  const interest = accountDetails.interest;
  const period = accountDetails.period;

  const formattedExpirationDate = expirationDate
    ? formatDate(accountDetails.expirationDate)
    : null;

  const value = accountDetails.value ? accountDetails.value : 0;

  return (
    <>
      <div className="card text-bg-info mb-3 principal">
        <div className="card-header">{accountDetails.iban}</div>
        <div className="card-body">
          <h5 className="card-title">{type}</h5>
          <h5 className="card-title">
            {value} {accountDetails.currency}
          </h5>
          {period && (
            <h6 className="card-text" style={{ marginBottom: "5px" }}>
              Period: {period}
            </h6>
          )}
          <h6 className="card-text" style={{ marginBottom: "5px" }}>
            Date opened: {openedDate}
          </h6>
          {expirationDate && (
            <h6 className="card-text" style={{ marginBottom: "5px" }}>
              Expiration date: {formattedExpirationDate}
            </h6>
          )}
          {interest && (
            <h6 className="card-text" style={{ marginBottom: "5px" }}>
              Interest: {interest}
            </h6>
          )}
          <Link
            to={{
              pathname: "/detailedAccount",
              state: { accountDetails: accountDetails },
            }}
            className="btn btn-primary Details"
          >
            Details
          </Link>
        </div>
      </div>
    </>
  );
};

export { AccountCard };
