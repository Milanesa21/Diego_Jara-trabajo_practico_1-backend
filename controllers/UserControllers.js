import User from '../models/user.js';

// Funciones de controllers para los usuarios
export const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = await User.create({ username, email, password });
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
};

export const UpdateUser = async (req, res) => {
    try {
        const { username, email } = req.body;
        const [updatedRowsCount, updatedUsers] = await User.update(
            { username, email },
            { where: { id: req.params.id }, returning: true }
        );
        if (updatedRowsCount > 0) {
            res.json(updatedUsers[0]);
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const deletedRowCount = await User.destroy({ where: { id: req.params.id } });
        if (deletedRowCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
};