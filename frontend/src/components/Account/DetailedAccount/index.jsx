import React, { useState } from "react";
import "./style.css";
import { useLocation } from "react-router-dom";
import { SERVER_URL } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { SimpleNavbar } from "../../Person/SimpleNavbar";

const DetailedAccount = () => {
  const location = useLocation();
  const details = location.state?.details;

  let iban = details.iban;
  let expirationDate = details.expirationDate;
  let currency = details.currency;
  let value = details.value;
  let type = details.type;
  let period = details.period;
  let interest = details.interest;

  return (
    <div className="home">
      <SimpleNavbar />
      <h1>{iban}</h1>
      <h1>{expirationDate}</h1>
      <h1>{currency}</h1>
      <h1>{value}</h1>
      <h1>{type}</h1>
      <h1>{period}</h1>
      <h1>{interest}</h1>
    </div>
  );
};

export { DetailedAccount };
