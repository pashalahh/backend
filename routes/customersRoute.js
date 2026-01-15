import express from 'express';
import { getUser, saveUser, showUserById, updateUserById, deleteUserById } from '../controllers/customersController.js';

const router = express.Router();

router.get('/customers',getUser);
router.post('/customers', saveUser);
router.get('/customers/:id', showUserById);
router.put('/customers/:id', updateUserById);
router.delete('/customers/:id', deleteUserById);

export default router;