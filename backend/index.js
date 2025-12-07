// Dependencies
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

// Services
import connectDb from './services/db.js'

// Routes
import authRoute from './routes/AuthRoute.js'
import noteRoute from './routes/noteRoute.js'

const app = express()

app.use(express.json())
app.use(cors())

dotenv.config()

app.use('/api/auth', authRoute)

app.use('/api/note', noteRoute)

const PORT = process.env.PORT

// Connect Db + Run Server
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`)
    })
})

