import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database.js';
import User from './user.js';
import Song from './song.js';

class Playlist extends Model {}

Playlist.init({
    id: {
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

Playlist.hasMany(Song);
Song.belongsTo(Playlist);

export default Playlist;
