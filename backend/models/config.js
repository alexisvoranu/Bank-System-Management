import { DataTypes, Sequelize } from "sequelize";
import {CardTemplate} from "./cards.js";
import {AccountTemplate} from "./accounts.js";
import {PersonTemplate} from "./persons.js";

export const db = new Sequelize({
    dialect: "sqlite",
    storage: "system.db" 
});

export const Card = CardTemplate(db, DataTypes);
export const Account = AccountTemplate(db, DataTypes);
export const Person = PersonTemplate(db, DataTypes);

//Person -> Account (One to Many)
Person.hasMany(Account, {foreignKey: 'personId'});
Account.belongsTo(Person, { foreignKey: 'personId' });

//Card -> Account (Many to One)
Account.hasMany(Card, {foreignKey: 'accountId'});
Card.belongsTo(Account, {foreignKey: 'accountId'}); 

export const synchronizeDatabase = async () => {
    await db.authenticate();
    await db.sync();
};