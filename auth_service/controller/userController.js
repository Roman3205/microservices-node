import prisma from "../config/db.config.js"

class UserController {
    async getUser(req,res) {
        try {
            const id = req.userId
            if (!id) {
                return res.status(400).json({message: 'Data is not provided'})
            }
            
            const user = await prisma.user.findUnique({
                where: {
                    id: id
                },
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            })
            return res.status(200).json({user})
        } catch (error) {
            return res.status(500).json({message: "User error", error})
        }
    }

    async getUsers (req,res) {
        try {
            const {userIds} = req.body

            if (!userIds) {
                return res.status(400).json({message: 'Data is not provided'})
            }

            const users = await prisma.user.findMany({
                where: {
                    id: {
                        in: userIds
                    }
                },
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            })
            return res.status(200).json({users})
        } catch (error) {
            return res.status(500).json({message: "Users error", error})
        }
    }
}

export default new UserController()