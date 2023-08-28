import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database.js';
import Playlist from './playlist.js';

class User extends Model {}

User.init({
    idUser: {
        type: DataTypes.INTEGER,        // Identificador del usuario
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
    },
    username: {
        type: DataTypes.STRING,         // Nombre de usuario
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: DataTypes.STRING,          // Dirección de correo electrónico
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,          // Contraseña del usuario
        allowNull: false,
        unique: false,
        validate: {
            len: {
                args: [8, undefined],    // Validación de longitud mínima
                msg: 'La contraseña debe contener al menos 8 caracteres'
            }
        }
    } 
}, {
    sequelize,                         // Instancia de Sequelize para la conexión a la base de datos
    modelName: 'User'                 // Nombre del modelo en la base de datos
});

User.hasMany(Playlist, {
    foreignKey: "idUser"
});                                   // Relación: Un usuario puede tener muchas listas de reproducción

export default User;
