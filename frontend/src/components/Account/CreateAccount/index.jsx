import React, { useState } from "react";
import "./style.css";
import { SERVER_URL } from "../../../constants";
import { useNavigate } from "react-router-dom";

const CreateAccountForm = ({ userRole }) => {
  const [iban, setIban] = useState("");
  const [currency, setCurrency] = useState(null);
  const [period, setPeriod] = useState(null);
  const [expirationDate, setExpirationDate] = useState(null);
  const [value, setValue] = useState(null);
  const [interest, setInterest] = useState(null);
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });

  const navigate = useNavigate();

  //Data curenta
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().slice(0, 10);

  const onChangeExpirationDate = (event) => {
    setExpirationDate(event.target.value);
  };

  const onChangeIban = (event) => {
    setIban(event.target.value);
  };

  const onChangeCurrency = (event) => {
    setCurrency(event.target.value);
  };

  const onChangeValue = (event) => {
    setValue(event.target.value);
  };

  const onChangeInterest = (event) => {
    setInterest(event.target.value);
  };

  function calculateExpirationDate(months) {
    const EstimatedExpirationDate = new Date(currentDate);
    EstimatedExpirationDate.setMonth(
      EstimatedExpirationDate.getMonth() + parseInt(months)
    );
    return EstimatedExpirationDate.toISOString().slice(0, 10);
  }

  const onChangePeriod = (event) => {
    setPeriod(event.target.value);
    const selectedMonths = event.target.value.split(" ")[0];
    const EstimatedExpirationDate = calculateExpirationDate(selectedMonths);
    document.getElementById("expirationDate").value = EstimatedExpirationDate;
    setExpirationDate(EstimatedExpirationDate);
    let StaticInterest = 0.0;
    if (selectedMonths == 3) StaticInterest = 6.0;
    else if (selectedMonths == 6) StaticInterest = 6.75;
    else if (selectedMonths == 12) StaticInterest = 7.75;
    else if (selectedMonths == 24) StaticInterest = 8.25;
    let interestString = "";
    interestString += StaticInterest + " %";
    document.getElementById("interest").value = interestString;
    setInterest(interestString);
  };

  const handleCreate = (event) => {
    event.preventDefault();
    create();
  };

  let createURL = SERVER_URL;
  createURL += "/accounts/create";

  let lastIBANURL = SERVER_URL;
  lastIBANURL += "/accounts/getLastIBAN";

  let fetchRes = fetch(lastIBANURL);

  fetchRes
    .then((res) => res.json())
    .then((d) => {
      let IBANinput = document.getElementById("IBANinput");

      let ibanString = "";
      if (d.iban === null || d.iban === undefined) {
        ibanString = "RAIF000000000000000000000";
      } else {
        ibanString = d.iban;
      }

      const ibanSubstring = ibanString.substring(4);

      const ibanNumber = parseInt(ibanSubstring);

      const incrementedNumber = ibanNumber + 1;

      const paddedNumber = String(incrementedNumber).padStart(20, "0");

      ibanString = "RAIF" + paddedNumber;

      ibanString = ibanString.padEnd(24, "0");

      IBANinput.setAttribute("placeholder", ibanString);

      setIban(ibanString);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  const create = () => {
    const accountDetails = {
      iban: iban,
      dateOpened: currentDate,
      expirationDate: expirationDate,
      currency: currency,
      value: value,
      type: userRole,
      personId: 1,
      period: period,
      interest: interest,
    };

    fetch(createURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(accountDetails),
    })
      .then((res) => {
        switch (res.status) {
          case 404:
            setAlert({
              show: true,
              type: "alert-warning",
              message: "Missing currency!",
            });
            break;
          case 400:
            setAlert({
              show: true,
              type: "alert-danger",
              message: "IBAN already in use!",
            });
            break;
          case 201:
            setAlert({
              show: true,
              type: "alert-success",
              message: "Account created successfully!",
            });
            navigate("/userhome");
            break;
        }

        //pentru a face alerta sa dispara dupa o secunda
        setTimeout(() => {
          setAlert({ show: false, type: "", message: "" });
        }, 3000);
      })

      .catch((error) => {
        console.error("Error: ".error);
        setAlert({
          show: true,
          type: "alert-info",
          message: "An error ocurred while creating the account!",
        });
        setTimeout(() => {
          setAlert({ show: false, type: "", message: "" });
        }, 3000);
      });
  };

  return (
    <div>
      {/* CURRENT */}
      {userRole === "current" && (
        <form className="create-account-form" onSubmit={handleCreate}>
          <div className="mx-auto col-md-3 Inputform">
            <label htmlFor="currencySelect" className="form-label">
              Currency
            </label>
            <select
              required
              id="currencySelect"
              onChange={onChangeCurrency}
              className="form-select custom-select"
            >
              <option selected>Open this select menu</option>
              <option value="RON">RON</option>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
          <div className="mx-auto col-md-3 LoginDiv">
            <label className="label" htmlFor="email">
              IBAN
            </label>
            <input
              className="form-control"
              id="IBANinput"
              type="text"
              onChange={onChangeIban}
              readOnly
            />
          </div>
          <div className="mx-auto col-md-3 LoginDiv">
            <label className="label" htmlFor="email">
              Date opened:
            </label>
            <input
              id="dateInput"
              className="form-control"
              type="text"
              placeholder={formattedDate}
              readOnly
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary mb-3 btn-create-account"
          >
            Create account
          </button>
        </form>
      )}
      {/* DEPOSIT */}
      {userRole === "deposit" && (
        <form className="create-account-form" onSubmit={handleCreate}>
          <div className="mx-auto col-md-3 Inputform">
            <label htmlFor="currencySelect" className="form-label">
              Currency
            </label>
            <select
              required
              id="currencySelect"
              onChange={onChangeCurrency}
              className="form-select custom-select"
            >
              <option selected>Open this select menu</option>
              <option value="RON">RON</option>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
            </select>
          </div>

          <div className="mx-auto col-md-3 LoginDiv">
            <label className="label" htmlFor="email">
              IBAN
            </label>
            <input
              className="form-control"
              id="IBANinput"
              type="text"
              onChange={onChangeIban}
              readOnly
            />
          </div>

          <div className="mx-auto col-md-3 LoginDiv">
            <label className="label" htmlFor="email">
              Date opened:
            </label>
            <input
              id="dateOpened"
              className="form-control"
              type="text"
              placeholder={formattedDate}
              readOnly
            />
          </div>

          <div className="mx-auto col-md-3 Inputform">
            <label htmlFor="currencySelect" className="form-label">
              Period
            </label>
            <select
              required
              id="currencySelect"
              onChange={onChangePeriod}
              className="form-select custom-select"
            >
              <option selected>Open this select menu</option>
              <option value="3 months">3 months</option>
              <option value="6 months">6 months</option>
              <option value="12 months">12 months</option>
              <option value="24 months">24 months</option>
            </select>
          </div>

          <div className="mx-auto col-md-3 LoginDiv">
            <label className="label" htmlFor="interest">
              Interest:
            </label>
            <input
              id="interest"
              onChange={onChangeInterest}
              className="form-control"
              type="text"
              readOnly
            />
          </div>

          <div className="mx-auto col-md-3 LoginDiv">
            <label className="label" htmlFor="value">
              Value:
            </label>
            <input
              id="value"
              onChange={onChangeValue}
              placeholder="1000"
              className="form-control"
              type="number"
            />
          </div>

          <div className="mx-auto col-md-3 LoginDiv">
            <label className="label" htmlFor="email">
              Expiration Date:
            </label>
            <input
              id="expirationDate"
              className="form-control"
              type="text"
              onChange={onChangeExpirationDate}
              placeholder={formattedDate}
              readOnly
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary mb-3 btn-create-account"
          >
            Create account
          </button>
        </form>
      )}
      {/* SAVINGS */}
      {userRole === "savings" && (
        <form className="create-account-form" onSubmit={handleCreate}>
          <div className="mx-auto col-md-3 Inputform">
            <label htmlFor="currencySelect" className="form-label">
              Currency
            </label>
            <select
              required
              id="currencySelect"
              onChange={onChangeCurrency}
              className="form-select custom-select"
            >
              <option selected>Open this select menu</option>
              <option value="RON">RON</option>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
            </select>
          </div>

          <div className="mx-auto col-md-3 LoginDiv">
            <label className="label" htmlFor="email">
              IBAN
            </label>
            <input
              className="form-control"
              id="IBANinput"
              type="text"
              onChange={onChangeIban}
              readOnly
            />
          </div>

          <div className="mx-auto col-md-3 LoginDiv">
            <label className="label" htmlFor="email">
              Date opened:
            </label>
            <input
              id="dateOpened"
              className="form-control"
              type="text"
              placeholder={formattedDate}
              readOnly
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary mb-3 btn-create-account"
          >
            Create account
          </button>
        </form>
      )}
      {/* Alert container */}
      {alert.show && (
        <div
          className={`alert ${alert.type} d-flex align-items-center`}
          role="alert"
        >
          <div>{alert.message}</div>
        </div>
      )}
    </div>
  );
};

export { CreateAccountForm };
