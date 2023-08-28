import  express  from 'express';
import { createSong, GetAllSongs, GetSongById,updateSong,DeleteSong, associateSongWithPlaylist, disassociateSongFromPlaylist } from '../controllers/songControllers.js';

const router = express.Router();

//Definir rutas para canciones
router.post('/', createSong);
router.get('/', GetAllSongs);
router.get('/:id', GetSongById);
router.put('/:id', updateSong);
router.delete('/:id', DeleteSong);
router.post('/:songId/playlist/:playlistId', associateSongWithPlaylist);
router.delete('/:songId/playlist/:playlistId', disassociateSongFromPlaylist);

export default router;