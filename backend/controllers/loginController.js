import User from "../models/User.js"
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })

        // 1 - If user DOES NOT exist, returns an error

        if (!user) {
            return res.status(401).json({ success: false, message: 'User does not exist.' })
        }

        // 2 - Check user password

        const checkPassword = await bcrypt.compare(password, user.password)

        // 2.1 If user input wrong password

        if (!checkPassword) {
            return res.status(401).json({ success: false, message: 'Wrong credentials.' })
        }

        // 3 - Generate Token

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '5h' })

        // 4 - Correct credentials

        return res.status(200).json({
            success: true,
            token: token,
            user: { name: user.name },
            message: 'Login-in successfully.'
        })

    } catch (error) {
        return res.status(401).json({ success: false, message: 'Error in login-in user.' })
    }
}