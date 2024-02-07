import * as accountsService from "../services/accounts.js";

const getAccounts = async (req, res) => {
    res.send({ accounts: await accountsService.getAccounts(req.query) });
};

const getById = async (req, res) => {
    const identifiedAccount = await accountsService.getById(req.params.id);

    if (!!identifiedAccount) {
        res.send({ account: identifiedAccount });
    } else {
        res.status(404).send();
    }
};

const create = async (req, res) => {
    if (!req.body.iban || !req.body.dateOpened || !req.body.currency || !req.body.value || !req.body.type) {
        return res.status(404).send({ message: "Missing properties" });
    }

    const existingAccounts = await accountsService.getAccounts({ iban: req.body.iban, dateOpened: req.body.dateOpened, expirationDate: req.body.expirationDate,
        currency: req.body.currency, value: req.body.value, type: req.body.type, interest: req.body.interest });
    if (existingAccounts.length !== 0) {
        return res.status(400).send({ message: "Account already exists" });
    }

    await accountsService.create(req.body);
    res.status(201).send();
};

const update = async (req, res) => {
    if (!req.body.id) {
        return res.status(400).send({ message: "Account id is mandatory" });
    }
    await accountsService.update(req.body);
    res.status(204).send();
}

const remove = (req, res) => {
    accountsService.remove(req.params.id);
    res.send();
}

const getAccountsForPerson = async(req, res) => {
    if(!req.query.personId){
        return res.status(400).send({message: "The person id is missing"})
    }

    const foundAccountsList = await accountsService.getAccountsForPerson(req.query.personId)

     res.status(200).json(foundAccountsList).send()
}

const getLastSavedIBAN = async (req, res) => {
    try {
        const lastSavedIBAN = await accountsService.getLastSavedIBAN();
        res.status(200).send({ iban: lastSavedIBAN });
    } catch (error) {
        res.status(500).send({ message: "Error fetching last saved IBAN" });
    }
};

export {
    getAccounts,
    getById,
    create,
    update,  
    remove,
    getAccountsForPerson,
    getLastSavedIBAN 
}