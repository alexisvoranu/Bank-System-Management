import React, { useState } from "react";
import "./style.css";
import { SERVER_URL } from "../../../constants";

const CreateAccountForm = ({ userRole }) => {
  const [iban, setIban] = useState("");
  const [dateOpened, setDateOpened] = useState("");
  const [currency, setCurrency] = useState("");
  const [value, setValue] = useState("");
  const [type, setType] = useState("");
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });

  const dateInput = document.getElementById("dateInput");

  // Creează un obiect de tip Data care reprezintă data și ora curentă
  const currentDate = new Date();

  // Formatați data în formatul dorit (de exemplu, 'YYYY-MM-DD')
  const formattedDate = currentDate.toISOString().slice(0, 10);

  // Setează valoarea inputului cu data formatată
  dateInput.value = formattedDate;

  const onChangeIban = (event) => {
    setIban(event.target.value);
  };

  const onChangeDateOpened = (event) => {
    setDateOpened(event.target.value);
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

  const handleCreate = (event) => {
    event.preventDefault();
    create();
  };

  const create = () => {
    const accountDetails = {
      iban: iban,
      dateOpened: dateOpened,
      currency: currency,
      value: 0,
      type: type,
    };

    let createURL = SERVER_URL;
    createURL += "/accounts/create";

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
              className="form-select custom-select"
            >
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
              class="form-control"
              type="text"
              placeholder="Readonly input here…"
              readonly
            />
          </div>
          <div className="mx-auto col-md-3 LoginDiv">
            <label className="label" htmlFor="email">
              Date opened:
            </label>
            <input
              id="dateInput"
              class="form-control"
              type="text"
              placeholder={formattedDate}
              readonly
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
