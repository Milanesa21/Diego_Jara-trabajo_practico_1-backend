import { Model, DataTypes } from 'sequelize';
import Sequelize from '../database/database.js';
import User from './user.js'
import Sonf from './song.js';

class Playlist extends Model{}

Playlist.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
},
    {
        sequelize,
        modelName: 'Playlist'
});

Playlist.hasMany(Song);
Song.belongsTo(Playlist);

export default Playlist;