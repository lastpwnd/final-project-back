import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'

export const registerUser = async (req, res) => {
    try {
         const user = await User.create({...req.body})
         return res.json({ msg:`New user "${req.body.name}" was successfully registered`}) 
 
    } catch (error) {
          let errorMsg = "Failed to register user"
          if (error.code == 11000) {
               errorMsg = "This e-mail is already registered"
          }
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: errorMsg})
    }
 }

export const loginUser = async (req, res) => {
     try {
          const { email, password } = req.body
          const user = await User.findOne({ email })

               if (!user) {
                    return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" })
               }

          const comparePasswords = await user.checkPassword(password)

               if (!comparePasswords) {
                    return res.status(StatusCodes.NOT_FOUND).json({ msg: "Wrong login/password" })
               }

          const token = user.createJWT()
          const { name, _id, avatarURL } = user._doc 
     
          res.json({ _id, name, token, avatarURL })

     } catch (error) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Failed to authorize "})
     }
}

export const checkUser = async (req, res) => {
     try {
          const user = await User.findById(req.user.userID)

          if (!user) {
               return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" })
          }

          const { password, ...userData} = user._doc 
          res.json(userData)

     } catch (error) {
          
     }
}