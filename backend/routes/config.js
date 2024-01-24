import express from 'express';

import {router as cardsRouter} from './cards.js'
import {router as accountsRouter} from './accounts.js'
import {router as personsRouter} from './persons.js'

export const router = express.Router();

router.use("/cards", cardsRouter)
router.use("/accounts", accountsRouter)
router.use("/persons", personsRouter)

