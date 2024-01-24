import * as personsService from "../services/persons.js";

const getPersons = async (req, res) => {
    res.send({ persons: await personsService.getPersons(req.query) });
};

const getById = async (req, res) => {
    const identifiedPerson = await personsService.getById(req.params.id);

    if (!!identifiedPerson) {
        res.send({ persons: identifiedPerson });
    } else {
        res.status(404).send();
    }
};

const create = async (req, res) => {
    if (!req.body.name || !req.body.birthDate || !req.body.phone || !req.body.email || !req.body.password) {
        return res.status(404).send({ message: "Missing properties" });
    }

    const existingpersons = await personsService.getPersons({ name: req.body.name, birthDate: req.body.birthDate, phone: req.body.phone, email: req.body.email, password: req.body.password });
    if (existingpersons.length !== 0) {
        return res.status(400).send({ message: "Person already exists" });
    }

    await personsService.create(req.body);
    res.status(201).send();
};

const update = async (req, res) => {
    if (!req.body.id) {
        return res.status(400).send({ message: "Person id is mandatory" });
    }

    await personsService.update(req.body);
    res.status(204).send();
}

const remove = (req, res) => {
    personsService.remove(req.params.id);
    res.send();
}

export {
    getPersons,
    getById,
    create,
    update,  
    remove
}