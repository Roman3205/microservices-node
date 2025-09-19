import express from 'express'
import Routes from './routes/index.js'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config()
const app = express()
const PORT = process.env.PORT || 3044

app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.send('Post Service is running')
})

app.use(Routes)

app.listen(PORT, () => {
    console.log(`Post Service is running on port ${PORT}`)
})