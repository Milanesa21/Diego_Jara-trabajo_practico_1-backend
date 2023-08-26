import { express } from 'express';
import { createUser, getallUsers, getUserById, UpdateUser, deleteUser } from '../controllers/UserControllers.js';

const router = express.Router();

// Definir rutas para usuarios
router.post('/', createUser);
router.get('/', getallUsers);
router.get('/:id',getUserById);
router.put('/:id', UpdateUser);
router.delete('/:id', deleteUser);

export default router;