import express from 'express'
import connectDB from './db/connect.js'
import cors from 'cors'
import helmet from 'helmet'
import xss from 'xss-clean'
import 'dotenv/config'
import { authRouter } from './routes/auth.js'
import { postsRouter } from './routes/posts.js'
import { getTags } from './controllers/posts.js'

const app = express()
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(xss())

const port = process.env.PORT || 4444;

app.get('/tags', getTags)
app.use('/auth', authRouter)
app.use('/posts', postsRouter)

const start = () => {
  try {
    connectDB(process.env.MONGO_URI)
    return app.listen(port, () =>
      console.log(`Server started on port: ${port}...`),
    )
  } 
  catch (error) {
    console.log("Error happened while connecting database: ", error)
  }
}

start()