import {Router} from 'express'
import postController from '../controller/postController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = Router()

router.get('/posts', postController.index)
router.post('/post', authMiddleware, postController.store)

export default router
