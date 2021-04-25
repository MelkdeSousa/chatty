import { Request, Response } from 'express'
import { ResponseError } from '../lib/errors/response'

import SettingService from '../services/settings.service'

interface SettingBody {
  chat: boolean
  username: string
}

interface SettingParams {
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

  async update(req: Request<SettingParams, any, SettingBody>, res: Response) {
    const { username } = req.params
    const { chat } = req.body

    const settingsService = new SettingService()

    await settingsService.updateChat(username, chat)

    return res.status(200)
  }

  async findByUsername(req: Request<SettingParams>, res: Response) {
    const { username } = req.params

    try {
      const settingsService = new SettingService()

      const settings = await settingsService.findByUsername(username)

      return res.status(200).json(settings)
    } catch (err) {
      const { statusCode, message } = err as ResponseError

      return res.status(statusCode).json(message)
    }
  }
}

export default SettingsController
