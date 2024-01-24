import { DataTypes } from "sequelize";

export const CardTemplate = (db, DataTypes) => {
    return db.define("card", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        serialNo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        expirationDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        CVV: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, 
    {
        indexes: [
            {
                unique: true,
                fields: ['serialNo']
            }
        ],
        underscore: true
    }
    )
}