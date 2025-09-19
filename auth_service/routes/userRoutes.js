import { Router } from "express";
import userController from "../controller/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router()

router.get('/user', authMiddleware, userController.getUser)
router.get('/users', userController.getUsers)

export default router