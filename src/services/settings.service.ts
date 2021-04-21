import { getCustomRepository } from 'typeorm'
import Setting from '../entities/Setting'
import SettingRepository from '../repositories/SettingRepository'

interface SettingServiceCreateSetting {
  chat: boolean
  username: string
}

class SettingService {
  async createSetting({
    chat,
    username,
  }: SettingServiceCreateSetting): Promise<Setting> {
    const settingRepository = getCustomRepository(SettingRepository)

    const setting = settingRepository.create({
      chat,
      username,
    })

    await settingRepository.save(setting)

    return setting
  }
}

export default SettingService
