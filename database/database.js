import{ Sequelize, DataTypes, Model } from ('sequelize');
import dotenv from 'dotenv'

dotenv.config();

const sequelize = new sequelize(
process.env.DB_NAME,
process.env.DB_USER,
process.env.DB_PASSWORD,
{
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
});

export {
    sequelize,
    DataTypes,
    Model
};