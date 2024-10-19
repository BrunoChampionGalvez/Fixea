import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import "reflect-metadata"

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

export default app