import Playlist from '../models/playlist.js';
import Song from '../models/song.js';

// Crear una nueva canción
export const createSong = async (req, res) => {
    try { 
        const { title, artist } =req.body;
        const newSong = await Song.create({ title, artist });
        res.status(201).json(newSong);
   } catch (error) {
       res.status(500).json({ error: 'Error al crear la cancion'});
 }
};

// Obtener todas las canciones
export const GetAllSongs = async (req, res) => {
    try { 
       const songs = await Song.findAll();
       res.json(songs);
   } catch (error) {
       res.status(500).json({ error: 'Error alobtener las canciones' });
 }
};

// Obtener una canción por su ID
export const GetSongById = async (req, res) => {
   try { 
       const song = await Song.findByPk(req.params.id);
       if (song) {
        res.json(song);
    }  else {
        res.status(404).json({ error: 'Cancion no encontrada' });
    }
 }     catch (error) {
    res.status(500).json({ error: 'Error al obtener la cancion' });
 }
};

// Actualizar una canción por su ID
export const updateSong = async (req, res) => {
    try {
        const { title, artist } = req.body;
        const [updatedRowsCount, updatedSongs] = await Song.update(
            { title, artist },
            { where: { id: req.params.id }, returning: true }
        );

        if (updatedRowsCount > 0) {
            res.json(updatedSongs[0]);
        } else {
            res.status(404).json({ error: 'Cancion no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la cancion' });
    }
};

// Eliminar una canción por su ID
export const DeleteSong = async (req, res) => {
    try {
        const deletedRowCount = await Song.destroy({ where: { id: req.params.id } });
        if (deletedRowCount > 0) {
        res.status(204).send();
    }  else {
        res.status(404).json({ error: 'Cancion no encontrada' });
    }
 }  catch (error) {
    res.status(500).json({ error: 'Error al eliminar la cancion' });
 }
};

// Asociar una canción con una playlist
export const associateSongWithPlaylist = async (req, res) => {
    try {
        const { playlistId } = req.params;
        const { songId } = req.body;

        const playlist = await Playlist.findByPk(playlistId);
        const song = await Song.findByPk(songId);

        if (!playlist || !song) {
            return res.status(404).json({ error: 'Playlist o canción no encontrada' });
        }

        await playlist.addSong(song);

        res.status(200).json({ message: 'Canción asociada con la playlist' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al asociar la canción con la playlist' });
    }
};

// Desasociar una canción de una playlist
export const disassociateSongFromPlaylist = async (req, res) => {
    try {
        const { playlistId, songId } = req.params;

        const playlist = await Playlist.findByPk(playlistId);
        const song = await Song.findByPk(songId);

        if (!playlist || !song) {
            return res.status(404).json({ error: 'Playlist o canción no encontrada' });
        }

        await playlist.removeSong(song);

        res.status(200).json({ message: 'Canción eliminada de la playlist' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la canción de la playlist' });
    }
};