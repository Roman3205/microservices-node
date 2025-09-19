import prisma from '../config/db.config.js'
import dotenv from 'dotenv'
import axios from 'axios'
dotenv.config()

class PostController {
    async index(req,res) {
        try {
            const posts = await prisma.post.findMany({})

            let userIds = []
            posts.forEach((post) => {
                userIds.push(post.user_id)
            })

            const response = await axios.get(`${process.env.AUTH_SERVICE}/api/users`, {
                data: {
                    userIds
                }
            })

            let postWithUsers = await Promise.all(
                posts.map((post) => {
                    const user = response.data.users.find((user) => user.id === post.user_id)
                    return {
                        ...post,
                        user
                    }
                })
            )

            return res.status(200).json(postWithUsers)
        } catch (error) {
            return res.status(500).json({message: 'Something went wrong',error})
        }
    }

    async store(req,res) {
        try {
            const id = req.userId
            const {title, content} = req.body
            if (!title || !content || !id) {
                return res.status(400).json({message: 'Data is not provided'})
            }
            const post = await prisma.post.create({
                data: {
                    user_id: id,
                    title,
                    content
                }
            })

            return res.status(200).json({message: 'Post created successfully', post})
        } catch (error) {
            return res.status(500).json({message: 'Something went wrong', error})
        }
    }
}

export default new PostController()