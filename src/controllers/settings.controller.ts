import { Request, Response } from 'express'
import { ResponseError } from '../lib/errors/response'

import SettingService from '../services/settings.service'

interface SettingBody {
  chat: boolean
  username: string
}

class SettingsController {
  async create(req: Request, res: Response) {
    try {
      const { chat, username } = req.body as SettingBody

      const settingsService = new SettingService()

      const setting = await settingsService.createSetting({ chat, username })

      return res.status(201).json(setting)
    } catch (err) {
      const { statusCode, message } = err as ResponseError
      return res.status(statusCode).json({ error: message })
    }
  }
}

export default SettingsController
