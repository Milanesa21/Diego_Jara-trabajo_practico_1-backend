import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database.js';
import Playlist from './playlist.js';

class Song extends Model {}

Song.init ({
    tittle: {
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