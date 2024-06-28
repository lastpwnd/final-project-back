import { validationResult } from "express-validator"
import { StatusCodes } from "http-status-codes"

export default (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(StatusCodes.BAD_REQUEST).json(errors.array())
    }
    next()
}