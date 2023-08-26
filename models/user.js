import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/db';
import Playlist from './playlist';

class User extends Model {}

User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
