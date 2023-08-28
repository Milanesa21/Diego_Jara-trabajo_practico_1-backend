import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import userRoutes from './routes/user.Routes.js';
import playlistRoutes from './routes/Playlist.Routes.js';
import songRoutes from './routes/Song.Routes.js';
import dotenv from 'dotenv';
import sequelize from './database/database.js';


dotenv.config();

// Configuracion de la aplicación.
const app = express();
const port = process.env.PORT;



// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());



// Establecer la conexión con la base de datos


// Definicion de las rutas
app.use('/users', userRoutes);
app.use('/playlists', playlistRoutes);
app.use('/songs', songRoutes);


//Listen port
app.listen(port, () => {
    sequelize.sync({force: true})
  console.log(`Servidor en funcionamiento en el puerto ${port}`);
});