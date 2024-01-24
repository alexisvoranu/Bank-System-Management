import { Op } from "sequelize";
import { Card, Person } from "../models/config.js";

export const getCards = async (query) => {
    delete query.id;
    
    const whereConditions = Object.keys(query).map(key => {
 
        if (key === "serialNo") {
            return { [key]: { [Op.like]: `%${query[key]}%` } }
        }

        return { [key]: query[key] }
    });

    return await Card.findAll({
        attributes: ['id', 'serialNo', 'expirationDate', 'CVV'],
        where: whereConditions
    });
};

export const getById = async (id) => {

    return await Card.findOne({
        attributes: ['id', 'serialNo', 'expirationDate', 'CVV'],
        where: {
            id: id
        }
    });
};

export const create = async (card) => {

    return await Card.create(card);
};

export const update = async (cardUpdateData) => {

    const card = await Card.findOne({
        where: {
            id: cardUpdateData.id
        }
    });

    if (!!card) {
        delete cardUpdateData.id;

        card.set({
            ...cardUpdateData
        });

        await card.save();
    }
}

export const remove = (id) => {
    Card.destroy({
        where: {
            id: id
        }
    });
}

export const getCardsForAccount = async (id) => {
    return await Card.findAll({
        attributes: ['id', 'serialNo', 'expirationDate', 'CVV'],
        where: {
            accountId: id
        }
    })
}