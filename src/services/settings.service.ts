import { getCustomRepository } from 'typeorm'
import Setting from '../entities/Setting'
import ErrorResponse from '../lib/errors/response'
import SettingRepository from '../repositories/SettingRepository'

interface SettingServiceCreate {
  chat: boolean
  username: string
}

class SettingService {
  private settingRepository: SettingRepository

  constructor() {
    this.settingRepository = getCustomRepository(SettingRepository)
  }

  async createSetting({
    chat,
    username,
  }: SettingServiceCreate): Promise<Setting> {
    const userAlreadyExists = await this.settingRepository.findOne({ username })

    if (userAlreadyExists)
      throw new ErrorResponse({
        message: 'User already exists',
        statusCode: 400,
      })

    const setting = this.settingRepository.create({
      chat,
      username,
    })

    await this.settingRepository.save(setting)

    return setting
  }
}

export default SettingService
