import User from "../models/User.js"
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const user = await User.findOne({ email })

        // 1 - If user exist returns an error
        if (user) {
            return res.status(401).json({ success: false, message: 'User already exists.' })
        }

        // 2 - Hashing password
        const hashPassword = await bcrypt.hash(password, 10)

        // 3 - Creating new user
        const newUser = new User({
            name: name,
            email: email,
            password: hashPassword,
        })

        await newUser.save()

        return res.status(200).json({ success: true, message: 'Account created successfully.' })

    } catch (error) {
        console.log(error.message)
        return res.status(401).json({ success: false, message: 'Error in creating new user.' })
    }
}