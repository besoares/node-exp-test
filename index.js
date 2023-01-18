import express from "express"
import mongoose from "mongoose"
import router from './routes/index.js'
import session from 'express-session';
import cors from 'cors'
import connectRedis from 'connect-redis';
import { createClient } from "@redis/client";

let RedisStore = connectRedis(session);

const DB_PORT = process.env.DB_PORT || 27017
const DB_NAME = process.env.DB_NAME || 'mydb'
const DB_IP = process.env.DB_IP || 'my-mongo'

const REDIS_IP = process.env.REDIS_IP || 'my-redis'
const REDIS_PORT = process.env.REDIS_port || 6379

let redisClient = createClient({ 
    legacyMode: true,
    url: `redis://${REDIS_IP}:${REDIS_PORT}`
})
redisClient.connect().catch(console.error)

mongoose.set('strictQuery', true)
mongoose
    .connect(`mongodb://root:password@${DB_IP}:${DB_PORT}/${DB_NAME}?authSource=admin`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to mongo'))
    .catch(e => console.log('Error connecting to mongo', e));

const app = express()

app.enable("trust proxy")
app.use(cors({}))
app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      saveUninitialized: false,
      secret: process.env.REDIS_SECRET || 'redis-secret',
      resave: false,
      cookie: {
        secure: false,
        resave: false,
        saveUninitialized: false,
        httpOnly: true,
        maxAge: 1000000000 //11,5 dias
      }
    })
  )
app.use(express.json())

app.get("/api/v1", (req, res) => {
    res.send('Hi bass!')
})

router(app)

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Listening to port ${port}`))