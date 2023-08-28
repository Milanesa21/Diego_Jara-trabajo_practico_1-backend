import  express  from 'express';
import { createPlaylist, getAllPlaylists, getPlaylistById, updatePlaylist, deletePlaylist, associatePlaylistWithUser, disassociatePlaylistFromUser  } from '../controllers/PlaylistControllers.js';

const router = express.Router();

//Definir rutas para las playlists
router.post('/', createPlaylist);
router.get('/', getAllPlaylists);
router.get('/:id', getPlaylistById);
router.put('/:id', updatePlaylist);
router.delete('/:id', deletePlaylist);
router.post('/:playlistId/user/:userId', associatePlaylistWithUser);
router.delete('/:playlistId/user/:userId', disassociatePlaylistFromUser);

export default router;