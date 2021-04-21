import { Router } from 'express'

import SettingsController from './controllers/settings.controller'

const routes = Router()

const settingsController = new SettingsController()

routes.post('/settings', settingsController.create)

export default routes
