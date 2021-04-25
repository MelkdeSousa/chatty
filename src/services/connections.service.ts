import { getCustomRepository } from 'typeorm'

import Connection from '../entities/Connection'
import ConnectionRepository from '../repositories/ConnectionRepository'

interface ConnectionServiceCreate {
  id?: string
  admin_id?: string
  socket_id: string
  user_id: string
}

class ConnectionService {
  private connectionRepository: ConnectionRepository

  constructor() {
    this.connectionRepository = getCustomRepository(ConnectionRepository)
  }

  async createConnection({
    id,
    admin_id,
    socket_id,
    user_id,
  }: ConnectionServiceCreate): Promise<Connection> {
    const connection = this.connectionRepository.create({
      id,
      admin_id,
      socket_id,
      user_id,
    })

    await this.connectionRepository.save(connection)

    return connection
  }

  async findConnectionByUserId(
    user_id: string
  ): Promise<Connection | undefined> {
    const connectionAlreadyExists = await this.connectionRepository.findOne({
      user_id,
    })

    return connectionAlreadyExists
  }
}

export default ConnectionService
