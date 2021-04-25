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

  async findByUsername(username: string): Promise<Setting | undefined> {
    const setting = await this.settingRepository.findOne({ username })

    if (!setting)
      throw new ErrorResponse({
        message: 'Setting not exists',
        statusCode: 404,
      })

    return setting
  }

  async updateChat(username: string, chat: boolean): Promise<void> {
    await this.settingRepository
      .createQueryBuilder()
      .update(Setting)
      .set({ chat })
      .where('username= :username', {
        username,
      })
      .execute()
  }
}

export default SettingService
