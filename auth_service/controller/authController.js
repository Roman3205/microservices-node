import bcrypt from "bcrypt";
import prisma from "../config/db.config.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

class AuthController {
    async registration(req,res) {
        try {
            const {email, password, name} = req.body
            if (!email || !password || !name) {
                return res.status(400).json({message: 'Data is not provided'})
            }

            const userExists = await prisma.user.findUnique({where: {email}})
            if (userExists) {
                return res.status(400).json({message: "User already exists"})
            }

            let hashedPassword = await bcrypt.hash(password, 10)

            const user = await prisma.user.create({data: {
                email,
                password:hashedPassword,
                name
            }})

            return res.status(200).json(user.name)
        } catch (error) {
            return res.status(500).json({message: "Registration error", error})
        }
    }

    async login(req,res) {
        try {
            const {email, password} = req.body
            if(!email || !password) {
                return res.status(400).json({message: 'Data is not provided'})
            }

            const user = await prisma.user.findUnique({where: {email}})
            if (!user) {
                return res.status(400).json({message: "User not found"})
            }
            const isValidPassword = await bcrypt.compare(password, user.password)
            if (!isValidPassword) {
                return res.status(400).json({message: "Invalid password"})
            }
            const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: "3d"})

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 3 * 24 * 60 * 60 * 1000 // 3 days
            })
            return res.status(200).json({message: "Login successful"})
        } catch (error) {
            return res.status(500).json({message: "Login error", error})
        }
    }

    async logout(req,res) {
        try {
            res.clearCookie('token')
            return res.status(200).json({message: "Logout successful"})
        } catch (error) {
            return res.status(500).json({message: "Logout error", error})
        }
    }
}
export default new AuthController()