import { Router } from "express";
import AuthController from "../controller/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = Router();

router.post('/auth/registration', AuthController.registration)
router.post('/auth/login', AuthController.login)
router.post('/auth/logout', authMiddleware, AuthController.logout)

export default router