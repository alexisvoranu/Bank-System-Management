import { DataTypes } from "sequelize";

export const AccountTemplate = (db, DataTypes) => {
    return db.define("account", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        iban: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dateOpened: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        expirationDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        currency: {
            type: DataTypes.STRING,
            allowNull: false
        },
        value: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        interest: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        
    }, 
    {
        indexes: [
            {
                unique: true,
                fields: ['iban']
            }
        ],
        underscore: true
    }
    )
}