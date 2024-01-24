import express from 'express';
import * as accountController from "../controllers/accounts.js";

export const router = express.Router();

router.get("/", accountController.getAccounts);

router.get("/get/:id", accountController.getById);

router.get("/getAccountsForPerson", accountController.getAccountsForPerson);

router.put("/update", accountController.update);

router.delete("/remove/:id", accountController.remove);

router.post("/create", accountController.create);