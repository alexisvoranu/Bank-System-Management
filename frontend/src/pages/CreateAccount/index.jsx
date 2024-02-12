import React, { useEffect, useState } from "react";
import "./style.css";
import { NavbarHome } from "../../components/Home&Auth/NavbarHome";
import { CreateAccountForm } from "../../components/Account/CreateAccount";
import { SimpleNavbar } from "../../components/Person/SimpleNavbar";

const CreateAccount = () => {
  const [role, setRole] = useState("current");

  const handleRoleChange = (newRole) => {
    setRole(newRole);
  };

  return (
    <div className="home">
      <div id="nav">
        <SimpleNavbar />
      </div>
      <div className="mx-auto col-md-3 Inputform">
        <div id="CreateAccountForm">
          <label htmlFor="floatingInput" className="form-label">
            Account type
          </label>
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => handleRoleChange(e.target.value)}
          >
            <option selected>Select account type</option>
            <option value="current">Current Account</option>
            <option value="deposit">Deposit Account</option>
            <option value="savings">Savings Account</option>
          </select>
        </div>
      </div>
      <div className="aaa">
        <CreateAccountForm userRole={role} />
      </div>
    </div>
  );
};

export { CreateAccount };
