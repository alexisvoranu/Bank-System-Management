import { Op } from "sequelize";
import { Person } from "../models/config.js";

export const getPersons = async (query) => {
    delete query.id;
    
    const whereConditions = Object.keys(query).map(key => {
 
        if (key === "name"||key === "phone"||key === "email") {
            return { [key]: { [Op.like]: `%${query[key]}%` } }
        }

        return { [key]: query[key] }
    });

    return await Person.findAll({
        attributes: ['id', 'name', 'birthDate', 'phone', 'email', 'password'],
        where: whereConditions
    });
};

export const getById = async (id) => {

    return await Person.findOne({
        attributes: ['id', 'name', 'birthDate', 'phone', 'email', 'password'],
        where: {
            id: id
        }
    });
};

export const create = async (person) => {

    return await Person.create(person);
};

export const update = async (personUpdateData) => {

    const person = await Person.findOne({
        where: {
            id: personUpdateData.id
        }
    });

    if (!!person) {
        delete personUpdateData.id;

        person.set({
            ...personUpdateData
        });

        await person.save();
    }
}

export const remove = (id) => {
    Person.destroy({
        where: {
            id: id
        }
    });
}