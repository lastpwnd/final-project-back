import jwt from 'jsonwebtoken'
import { body } from 'express-validator'
import { StatusCodes } from 'http-status-codes'

export const registerValidation = [
    body('email', "Wrong address, valid example: yourname@mailservice.com").trim().notEmpty().isEmail(),
    body('password', "Minimum length is 4, maximum - 25").isLength({min: 4, max: 25}),
    body('name', "Minimum length is 4, maximum - 25").trim().isLength({min: 4, max: 25}),
    body('avatarURL', "Verify provided link...").optional().isURL()
]

export const loginValidation = [
    body('email', "Wrong address, valid example: yourname@mailservice.com").trim().notEmpty().isEmail(),
    body('password', "Minimum length is 4, maximum is 25").isLength({min: 4, max: 25})
]

export const authValidation = (req, res, next) => {

    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith("Bearer"))
        {
            return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Authorization Error"})
        }

    const token = authHeader.split(' ')[1]
   
   try {

        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { userID: payload.userID, name: payload.name }
        next()

   } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Authorization Error"})
   }
}