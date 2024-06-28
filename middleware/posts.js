import { body } from 'express-validator'

export const postCreateValidation = [
    body('title', "Minimum length is 4, maximum - 50").isLength({min: 4, max: 50}).isString(),
    body('text', "Minimum length is 10").isLength({min: 10}).isString(),
    body('tags', "Tags TypeError").optional().isArray(),
    body('imageURL', "Verify provided link...").optional().isURL()
]