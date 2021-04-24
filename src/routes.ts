import { Router } from 'express'
import MessagesController from './controllers/messages.controller'

import SettingsController from './controllers/settings.controller'
import UsersController from './controllers/users.controller'

const routes = Router()

const settingsController = new SettingsController()
const usersController = new UsersController()
const messagesController = new MessagesController()

routes.post('/settings', settingsController.create)

routes.post('/users', usersController.create)

routes.post('/messages', messagesController.create)
routes.get('/messages/:user_id', messagesController.list)

export default routes
