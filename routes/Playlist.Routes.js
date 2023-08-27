import  express  from 'express';
import { createPlaylist, getAllPlaylists, getPlaylistById, updatePlaylist, deletePlaylist } from '../controllers/PlaylistControllers.js';

const router = express.Router();

//Definir rutas para las playlists
router.post('/', createPlaylist);
router.get('/', getAllPlaylists);
router.get('/:id', getPlaylistById);
router.put('/:id', updatePlaylist);
router.delete('/:id', deletePlaylist);

export default router;