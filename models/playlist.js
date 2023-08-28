import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database.js';
import Song from './song.js';

class Playlist extends Model {}

Playlist.init({
    idPlaylist: {
        type: DataTypes.INTEGER,  // Identificador de la playlist
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,   // Nombre de la playlist
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    sequelize,
    modelName: 'Playlist'
});

Playlist.hasMany(Song, {
    foreignKey: "idPlaylist"
});                               // Relación: Una canción puede estar en varias listas

export default Playlist;
