import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database.js';
import Song from './song.js';

class Playlist extends Model {}

Playlist.init({
    idPlaylist: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    sequelize,
    modelName: 'Playlist'
});

Song.hasMany(Playlist);
Playlist.belongsTo(Song);

export default Playlist;