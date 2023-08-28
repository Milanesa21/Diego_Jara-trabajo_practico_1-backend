import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database.js';

class Song extends Model {}

Song.init({
    idSong: {
        type: DataTypes.INTEGER,         // Identificador de la canción
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,          // Título de la canción
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    artist: {
        type: DataTypes.STRING,          // Artista de la canción
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    sequelize,                          // Instancia de Sequelize para la conexión a la base de datos
    modelName: 'Song'                  // Nombre del modelo en la base de datos
});

export default Song;
