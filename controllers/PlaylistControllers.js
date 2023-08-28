import Playlist from '../models/playlist.js';
import User from '../models/user.js';
import Song from '../models/song.js';

// Función para crear una nueva playlist
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

// Función para obtener todas las playlists
export const getAllPlaylists = async (req, res) => {
    try {
        const playlists = await Playlist.findAll();
        res.json(playlists);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las listas de reproducción' });
    }
};

// Función para obtener una playlist por su ID
export const getPlaylistById = async (req, res) => {
    try {
        const playlistId = req.params.id;

        const playlist = await Playlist.findByPk(playlistId, {
            include: [
                { model: User, attributes: ['id', 'username', 'email'] },
                { model: Song }
            ]
        });

        if (!playlist) {
            return res.status(404).json({ error: 'Playlist no encontrada' });
        }

        res.json(playlist);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la playlist' });
    }
};

// Función para actualizar una playlist
export const updatePlaylist = async (req, res) => {
    try {
        const { name } = req.body;
        const [updatedRowsCount, updatedPlaylists] = await Playlist.update(
            { name },
            { where: { id: req.params.id }, returning: true }
        );
        if (updatedRowsCount > 0) {
            res.json(updatedPlaylists[0]);
        } else {
            res.status(404).json({ error: 'Playlist no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la playlist' });
    }
};

// Función para eliminar una playlist
export const deletePlaylist = async (req, res) => {
    try {
        const deletedRowCount = await Playlist.destroy({ where: { id: req.params.id } });
        if (deletedRowCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Playlist no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la playlist' });
    }
};

// Función para asociar una playlist con un usuario
export const associatePlaylistWithUser = async (req, res) => {
    try {
        const { playlistId, userId } = req.params;

        const playlist = await Playlist.findByPk(playlistId);
        const user = await User.findByPk(userId);

        if (!playlist || !user) {
            return res.status(404).json({ error: 'Playlist o usuario no encontrado' });
        }

        await playlist.setUser(user);

        res.status(200).json({ message: 'Playlist asociada con el usuario' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al asociar la playlist con el usuario' });
    }
};

// Función para desasociar una playlist de un usuario
export const disassociatePlaylistFromUser = async (req, res) => {
    try {
        const { playlistId, userId } = req.params;

        const playlist = await Playlist.findByPk(playlistId);
        const user = await User.findByPk(userId);

        if (!playlist || !user) {
            return res.status(404).json({ error: 'Playlist o usuario no encontrado' });
        }

        await playlist.setUser(null);

        res.status(200).json({ message: 'Playlist desasociada del usuario' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al desasociar la playlist del usuario' });
    }
};
