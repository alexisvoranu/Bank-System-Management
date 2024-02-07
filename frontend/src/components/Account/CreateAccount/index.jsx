import React, { useState } from "react";
import "./style.css";
import { SERVER_URL } from "../../../constants";

const CreateAccountForm = ({ userRole }) => {
  const [iban, setIban] = useState("");
  const [dateOpened, setDateOpened] = useState("");
  const [currency, setCurrency] = useState("");
  const [period, setPeriod] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [value, setValue] = useState("");
  const [type, setType] = useState("");
  const [interest, setInterest] = useState("");
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });

  //Data curenta
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().slice(0, 10);

  const onChangeDateOpened = (event) => {
    setDateOpened(event.target.value);
  };

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

  const onChangeType = (event) => {
    setType(event.target.value);
  };

  const onChangeInterest = (event) => {
    setInterest(event.target.value);
  };

  function calculateExpirationDate(months) {
    const expirationDate = new Date(currentDate);
    expirationDate.setMonth(expirationDate.getMonth() + parseInt(months));
    return expirationDate.toISOString().slice(0, 10);
  }

  const onChangePeriod = (event) => {
    setPeriod(event.target.value);
    const selectedMonths = event.target.value.split(" ")[0];
    const expirationDate = calculateExpirationDate(selectedMonths);
    document.getElementById("expirationDate").value = expirationDate;
    let StaticInterest = 0.0;
    if (selectedMonths === 3) StaticInterest = 6;
    else if (selectedMonths === 6) StaticInterest = 6.75;
    else if (selectedMonths === 12) StaticInterest = 7.75;
    else if (selectedMonths === 24) StaticInterest = 8.25;
    let interestString = "";
    interestString += StaticInterest + " %";
    document.getElementById("interest").value = interestString;
  };

  const handleCreate = (event) => {
    event.preventDefault();
    create();
  };

  const create = () => {
    const accountDetails = {
      iban: "RAIF2983484236489",
      dateOpened: "2021-03-11T19:00:00.000Z",
      expirationDate: null,
      currency: "RON",
      value: 0,
      type: "current",
      personId: 1,
      interest: null,
    };

    let createURL = SERVER_URL;
    createURL += "/accounts/create";

    let lastIBANURL = SERVER_URL;
    lastIBANURL += "/accounts/getLastIBAN";

    let fetchRes = fetch(lastIBANURL);

    fetchRes
      .then((res) => res.json())
      .then((d) => {
        // Asigurați-vă că IBANinput este definit
        let IBANinput = document.getElementById("IBANinput");

        let ibanString = d.iban;

        const ibanSubstring = ibanString.substring(4);

        const ibanNumber = parseInt(ibanSubstring);

        const incrementedNumber = ibanNumber + 1;

        ibanString = "RAIF" + incrementedNumber;

        IBANinput.setAttribute("value", ibanString);
      })
      .catch((error) => {
        console.error("A apărut o eroare:", error);
      });

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
              message: "Missing iban, dateOpened, currency or type!",
            });
            break;
          case 400:
            setAlert({
              show: true,
              type: "alert-danger",
              message: "Email already in use!",
            });
            break;
          case 201:
            setAlert({
              show: true,
              type: "alert-success",
              message: "Account created successfully!",
            });
            break;
        }

        //pentru a face alerta sa dispara dupa o secunda
        setTimeout(() => {
          setAlert({ show: false, type: "", message: "" });
        }, 1000);
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
        }, 1000);
      });
  };

  return (
    <div>
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
              <option value="3 months">6 months</option>
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
    </div>
  );
};

export { CreateAccountForm };
