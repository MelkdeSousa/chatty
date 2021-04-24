import { getCustomRepository } from 'typeorm'

import Message from '../entities/Message'
import MessageRepository from '../repositories/MessageRepository'

interface MessageServiceCreate {
  admin_id?: string
  text: string
  user_id: string
}

class MessageService {
  private messageRepository: MessageRepository

  constructor() {
    this.messageRepository = getCustomRepository(MessageRepository)
  }

  async createMessage({
    admin_id,
    text,
    user_id,
  }: MessageServiceCreate): Promise<Message> {
    const message = this.messageRepository.create({
      admin_id,
      text,
      user_id,
    })

    await this.messageRepository.save(message)

    return message
  }

  async getMessagesByUserId(user_id: string): Promise<Message[]> {
    const messages = await this.messageRepository.find({
      where: { user_id },
      relations: ['user'],
    })

    return messages
  }
}

export default MessageService
