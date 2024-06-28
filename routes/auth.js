import express from 'express'
import validationErrorHandler from '../middleware/validationErrorHandler.js'
import { registerUser, loginUser, checkUser } from '../controllers/auth.js'
import { registerValidation, loginValidation, authValidation } from '../middleware/auth.js'


export const authRouter = express.Router()

authRouter
    .post('/register',  registerValidation, validationErrorHandler, registerUser)
    .post('/login', loginValidation, validationErrorHandler, loginUser)
    .get('/me', authValidation, checkUser)
