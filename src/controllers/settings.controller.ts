import { Request, Response } from 'express'

import SettingService from '../services/settings.service'

class SettingsController {
  async create(req: Request, res: Response) {
    const { chat, username } = req.body

    const setting = await new SettingService().createSetting({ chat, username })

    return res.status(201).json(setting)
  }
}

export default SettingsController
