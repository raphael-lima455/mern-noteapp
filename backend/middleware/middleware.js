import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import dotenv from 'dotenv'

dotenv.config()

const middleware = async (req, res, next) => {
    try {
        const reqToken = req.headers.authorization
        const token = reqToken.split(' ')[1]

        // 1 - If a token DOES NOT EXIST return an error
        if (!token) {
            return res.status(401).json({ sucess: false, message: 'Unathorized.' })
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        // 1.1 - If a token DOES NOT PASS THE JWT return an error
        if (!decodedToken) {
            return res.status(401).json({ sucess: false, message: 'Unathorized token.' })
        }

        // 2 - Lookup for user with the payload ID from decoded JWT

        const user = await User.findById(decodedToken.id)

        // 2.1 - If the ID of user JWT payload does not match with DB, return an error
        if (!user) {
            return res.status(401).json({ sucess: false, message: 'No user found.' })
        }


        const newUser = { name: user.name, id: user._id }
        req.user = newUser
        next()

    } catch (error) {
        return res.status(500).json({ sucess: false, message: 'Please login-in.' })
    }
}

export default middleware;