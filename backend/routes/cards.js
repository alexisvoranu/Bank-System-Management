import express from 'express';
import * as cardController from "../controllers/cards.js";

export const router = express.Router();

router.get("/", cardController.getCards);

router.get("/get/:id", cardController.getById);

router.get('/getCardsForAccount', cardController.getCardsForAccount);

router.put("/update", cardController.update);

router.delete("/remove/:id", cardController.remove);

router.post("/create", cardController.create);

