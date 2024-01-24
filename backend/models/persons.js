import { DataTypes } from "sequelize";

export const PersonTemplate = (db, DataTypes) => {
    return db.define("person", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        birthDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            },
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, 
    {
        indexes: [
            {
                unique: true,
                fields: ['phone']
            }
        ],
        underscore: true
    }
    )
}