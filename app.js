import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import userRoutes from './routes/userRoutes';
import playlistRoutes from './routes/playlistRoutes';
import songRoutes from './routes/songRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use('users', userRoutes);
app.use('/playlists', playlistRoutes);
app.use('/songs', songRoutes);

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto ${port}`);
});