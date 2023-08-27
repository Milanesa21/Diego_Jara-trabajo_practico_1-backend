import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database.js';

class Song extends Model {}

Song.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    artist: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    sequelize,
    modelName: 'Song'
});

export default Song;
