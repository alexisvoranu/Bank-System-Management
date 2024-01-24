import * as cardsService from "../services/cards.js";

const getCards = async (req, res) => {
    res.send({ cards: await cardsService.getCards(req.query) });
};

const getById = async (req, res) => {
    const identifiedCard = await cardsService.getById(req.params.id);

    if (!!identifiedCard) {
        res.send({ card: identifiedCard });
    } else {
        res.status(404).send();
    }
};

const create = async (req, res) => {
    if (!req.body.serialNo || !req.body.expirationDate || !req.body.CVV) {
        return res.status(404).send({ message: "Missing properties" });
    }

    const existingCards = await cardsService.getCards({ serialNo: req.body.serialNo, expirationDate: req.body.expirationDate, CVV: req.body.CVV});
    if (existingCards.length !== 0) {
        return res.status(400).send({ message: "Card already exists" });
    }

    await cardsService.create(req.body);
    res.status(201).send();
};

const update = async (req, res) => {
    if (!req.body.id) {
        return res.status(400).send({ message: "Card id is mandatory" });
    }

    await cardsService.update(req.body);
    res.status(204).send();
}

const remove = (req, res) => {
    cardsService.remove(req.params.id);
    res.send();
}

const getCardsForAccount = async(req, res) => {
    if(!req.query.accountId){
        return res.status(400).send({message: "The account id is missing"})
    }

    const foundCardsList = await cardsService.getCardsForAccount(req.query.accountId)

     res.status(200).json(foundCardsList).send()
}

export {
    getCards,
    getById,
    create,
    update,  
    remove,
    getCardsForAccount
}