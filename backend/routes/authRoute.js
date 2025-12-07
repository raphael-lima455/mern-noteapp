import express from 'express'
import { signup } from '../controllers/authController.js'
import { login } from '../controllers/loginController.js'
import middleware from '../middleware/middleware.js';
import { verify } from '../controllers/authVerifyController.js';


const router = express.Router()

router.post('/signup', signup)

router.post('/login', login)

router.get('/verify', middleware, verify)


export default router;