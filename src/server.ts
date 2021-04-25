import 'reflect-metadata'
import compression from 'compression'
import express from 'express'
import { createServer } from 'http'
import path from 'path'
import { Server, Socket } from 'socket.io'

import './database'
import routes from './routes'

const app = express()

app.use(express.static(path.join(__dirname, '..', 'public')))
app.set('views', path.join(__dirname, '..', 'public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

const serverHttp = createServer(app)
const serverWS = new Server(serverHttp)

serverWS.on('connection', (socket: Socket) => {
  console.log(`User connected: ${socket.id}`)
})

app.use(express.json())
app.use(routes)
app.use(compression())

export { serverWS, serverHttp }
