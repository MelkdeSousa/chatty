import 'reflect-metadata'
import express from 'express'
import compression from 'compression'

import './database'
import routes from './routes'

const app = express()

app.use(express.json())
app.use(routes)
app.use(compression())

app.listen(3333, () => console.log('Server running'))
