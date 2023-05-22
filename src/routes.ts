import { Router } from "express";
import AuthController from "./controllers/AuthController";
import UserController from "./controllers/UserController";
import authMiddleware from "./middlewares/authMiddleware";

const router = Router();

router.post('/auth', AuthController.authenticate);
router.get('/user', authMiddleware, UserController.index);
router.get('/users', authMiddleware, UserController.getAll);

export default router;