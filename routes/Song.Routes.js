import { express } from 'express';
import { createSong, GetAllSongs, GetSongById,updateSong,DeleteSong } from '../controllers/songControllers.js';

const router = express.Router();

//Definir rutas para canciones
router.post('/', createSong);
router.get('/', getAllSongs);
router.get('/:id', getSongById);
router.put('/:id', updateSong);
router.delete('/:id', deleteSong);

export default router;