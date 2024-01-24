import express from 'express';
import * as personController from "../controllers/persons.js";

export const router = express.Router();

router.get("/", personController.getPersons);

router.get("/get/:id", personController.getById);

router.put("/update", personController.update);

router.delete("/remove/:id", personController.remove);

router.post("/create", personController.create);

router.post('/login', personController.login);
