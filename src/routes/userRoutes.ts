import express from 'express';
import UserController from '../controllers/UserController';


const router = express.Router();
const userController = new UserController();

router.get('/', userController.fetchUsers);
router.post('/import', userController.import);

export default router;
