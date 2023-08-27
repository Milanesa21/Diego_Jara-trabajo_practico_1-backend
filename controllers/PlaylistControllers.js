import Playlist from '../models/playlist.js';

// Funciones de controllerspara las playlist
export const createPlaylist = async (req, res) => {
    try {
       const { name } = req.body;
       const newPlaylist = await Playlist.create({ name });
       res.status(201).json(newPlaylist);
    } catch (error) {
       console.error('Error al crear la playlist:', error);
       res.status(500).json({ error: 'Error al crear la playlist' });
    }
};


export const getAllPlaylists = async (req, res) => {
 try { 
    const playlists = await Playlist.findAll();
    res.json(playlists);
 } catch (error) {
    res.status(500).json ({ error: 'Error al obtener las listas de reproduccion' });
 }
};

export const getPlaylistById = async (req, res) => {
try { 
    const playlist = await Playlist.findByPk(req.params.id);
    if (playlist) {
        res.json(playlist);
    } else {
        res.status(404).json({ error: 'Playlist no encontrada' });
    }
} catch (error) {
    res.status(500).json({ error: 'Errpr al obtener la Playlist'});
}
};

export const updatePlaylist = async (req, res) => {
 try {
    const { name } = req.body;
    const [updatedRowsCount, updatePlaylists ] = await Playlist.update(
         { name },
         { where: { id: req.params.id }, returning: true }
    );
    if (updatedRowsCount > 0 ) {
        res.json(updatePlaylists[0]);
    } else {
        res.status(404).json({ error: 'Playlist no encontrada' });
    }
 } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la playlst' });
 }
};

export const deletePlaylist = async (req, res) =>{
 try {
    const deletedRowCount = await Playlist.destroy({ where: { id: req.params.id } });
    if (deletedRowCount > 0) {
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Playlist no encontrada' });
    }
 } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la playlist'})
 }
};