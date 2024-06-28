import Post from '../models/Post.js'
import { StatusCodes } from 'http-status-codes'

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('user').sort({'createdAt': Number( req.query.sort )})
        res.json(posts)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Failed retrieving posts" })
    }
}

export const getOnePost = async (req, res) => {
    try {
        const postID = req.params.id
        await Post.findOneAndUpdate({
            _id: postID,
        }, {
            $inc: { viewsCounter: 1 }
        }, {
            returnDocument: 'after'
        })
        .populate('user')
        .then(post => {
            if (!post) {
                return res.status(StatusCodes.NOT_FOUND).json({ msg: "Post not found!" })
            }
            res.json(post)
        })
       
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Failed retrieving posts" })
    }
}

export const getTags = async (req, res) => {
    try {
        const posts = await Post.find().limit(5)
        const tags = posts.map( post => post.tags ).flat().slice(0,9)
        res.json(tags)
        
    } catch (error) {
      
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Failed retrieving tags" })
    }
}

export const getPostsByTags = async (req, res) => {
    try {
        const posts = await Post.find({ tags : `${req.params.tag}`}).populate('user')
        res.json(posts)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Failed retrieving posts by tag" })
    }
}

export const createPost = async (req, res) => {
    try {
        const postModel = new Post({
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            user: req.user.userID
        })
     
        const post = await Post.create(postModel)
        res.json(post)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Failed to create post" })
    }
}

export const removePost = async (req, res) => {
    try {
        const postID = req.params.id
        await Post.findOneAndDelete({
            _id: postID,
        }).then(done => {
            if (!done) {
                return res.status(StatusCodes.NOT_FOUND).json({ msg: "Failed deleting post" })
            }
            res.json({ deleted: true })
        })
       
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Failed retrieving posts" })
    }
}

export const updatePost = async (req, res) => {
    try {
        const postID = req.params.id
        await Post.findOneAndUpdate({
            _id: postID,
        }, {
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            user: req.user.userID
        })
        
        res.json({ msg: "Post is updated!" })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Failed updating post" })
    }
}

