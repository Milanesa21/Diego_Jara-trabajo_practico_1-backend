import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database.js';
import Playlist from './playlist.js';

class User extends Model {}

User.init({
    idUser: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        validate: {
            len: {
                args: [8, undefined],
                msg: 'La contraseña debe contener al menos 8 caracteres'
            }
        }
    } 
}, {
    sequelize,
    modelName: 'User'
});

User.hasMany(Playlist);
Playlist.belongsTo(User);

export default User;
