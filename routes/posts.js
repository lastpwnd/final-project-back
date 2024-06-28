import express from 'express'
import validationErrorHandler from '../middleware/validationErrorHandler.js'
import { postCreateValidation } from '../middleware/posts.js'
import { authValidation } from '../middleware/auth.js'
import { createPost, getAllPosts, getOnePost, removePost, updatePost, getTags, getPostsByTags} from '../controllers/posts.js'


export const postsRouter = express.Router()

postsRouter
    .get('/', getAllPosts)
    .get('/:id', getOnePost)
    .get('/tags', getTags)
    .get('/tags/:tag', getPostsByTags)
    //protected routes:
    .post('/create', authValidation, postCreateValidation, validationErrorHandler, createPost)
    .delete('/:id', authValidation, removePost)
    .patch('/:id', authValidation, validationErrorHandler, updatePost)