import { Op } from "sequelize";
import { Account } from "../models/config.js";

export const getAccounts = async (query) => {
    delete query.id;
    
    const whereConditions = Object.keys(query).map(key => {
 
        if (key === "iban") {
            return { [key]: { [Op.like]: `%${query[key]}%` } }
        }

        return { [key]: query[key] }
    });

    return await Account.findAll({
        attributes: ['id', 'iban', 'dateOpened', 'currency', 'value', 'type'],
        where: whereConditions
    });
};

export const getById = async (id) => {

    return await Account.findOne({
        attributes: ['id', 'iban', 'dateOpened', 'currency', 'value', 'type'],
        where: {
            id: id
        }
    });
};

export const create = async (account) => {

    return await Account.create(account);
};

export const update = async (accountUpdateData) => {

    const account = await Account.findOne({
        where: {
            id: accountUpdateData.id
        }
    });

    if (!!account) {
        delete accountUpdateData.id;

        account.set({
            ...accountUpdateData
        });

        await account.save();
    }
}

export const remove = (id) => {
    Account.destroy({
        where: {
            id: id
        }
    });
}

export const getAccountsForPerson = async (id) => {
    return await Account.findAll({
        attributes: ['id', 'iban', 'dateOpened', 'currency', 'value', 'type'],
        where: {
            personId: id
        }
    })
}