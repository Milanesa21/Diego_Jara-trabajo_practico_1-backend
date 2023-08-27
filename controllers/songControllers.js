import Song from '../models/song.js'

// Funciones de controllers para las canciones
export const createSong = async (req, res) => {
    try { 
        const { title, artist } =req.body;
        const newSong = await Song.create({ title, artist });
        res.status(201).json(newSong);
   } catch (error) {
       res.status(500).json({ error: 'Error al crear la cancion'});
 }
};

export const GetAllSongs = async (req, res) => {
    try { 
       const songs = await Song.findAll();
       res.json(songs);
   } catch (error) {
       res.status(500).json({ error: 'Error alobtener las canciones' });
 }
};

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

export const  updateSong = async (req, res) =>{
   try {
       const { title, artist } = req.body;
        const [updatedRowsCount, updateSongs ] = await Song.update(
           { title, artist },
           { where: {id: req.params.id }, returning: true }
    );
        if (updatedRowsCount > 0) {
        res.json(updateSong[0]);
    }   else {
        res.status(404).json({ error: 'Cancion no encontrada' });
    }
 }  catch (error) {
    res.status(500).json({ error: 'Error al actualizar la cancion' });
 }
};

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