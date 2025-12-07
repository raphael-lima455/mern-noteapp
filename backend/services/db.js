import mongoose from 'mongoose'
import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log('Database connected successfully.')
    } catch (error) {
        console.log('Error connecting to database:', error)
    }
}

export default connectDb;