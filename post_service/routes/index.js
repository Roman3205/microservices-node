import { Router } from "express";
import postRoutes from './postRoutes.js'

const router = Router()

router.use('/api', postRoutes)

export default router