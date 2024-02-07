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
        attributes: ['id', 'iban', 'dateOpened', 'expirationDate', 'currency', 'value', 'type', 'interest'],
        where: whereConditions
    });
};

export const getById = async (id) => {

    return await Account.findOne({
        attributes: ['id', 'iban', 'dateOpened', 'expirationDate', 'currency', 'value', 'type', 'interest'],
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
        attributes: ['id', 'iban', 'dateOpened', 'expirationDate', 'currency', 'value', 'type', 'interest'],
        where: {
            personId: id
        }
    })
}

export const getLastSavedIBAN = async () => {
    try {
        const latestAccount = await Account.findOne({
            attributes: ['iban'],
            order: [['createdAt', 'DESC']], // Or any other field that indicates the order of records
            limit: 1 // Limit to only get the latest record
        });

        if (!latestAccount) {
            throw new Error("No accounts found in the database.");
        }

        return latestAccount.iban;
    } catch (error) {
        console.error("Error fetching last saved IBAN:", error);
        throw error;
    }
};
