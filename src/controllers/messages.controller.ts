import { Request, Response } from 'express'

import Message from '../entities/Message'
import MessageService from '../services/messages.service'

interface MessageBody {
  admin_id?: string
  text: string
  user_id: string
}

interface MessageParams {
  user_id: string
}

class MessagesController {
  async create(req: Request, res: Response): Promise<Response<Message>> {
    const { user_id, admin_id, text } = req.body as MessageBody

    const messagesService = new MessageService()

    const message = await messagesService.createMessage({
      user_id,
      admin_id,
      text,
    })

    return res.status(201).json(message)
  }

  async list(
    req: Request<MessageParams>,
    res: Response
  ): Promise<Response<Message[]>> {
    const { user_id } = req.params

    const messagesService = new MessageService()

    const messages = await messagesService.getMessagesByUserId(user_id)

    return res.status(200).json(messages)
  }
}

export default MessagesController
