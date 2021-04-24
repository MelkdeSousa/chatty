import { getCustomRepository } from 'typeorm'

import User from '../entities/User'
import UserRepository from '../repositories/UserRepository'

interface UserServiceCreate {
  email: string
}

class UserService {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = getCustomRepository(UserRepository)
  }

  async createUser({ email }: UserServiceCreate): Promise<User> {
    const userExists = await this.userRepository.findOne({ email })

    if (userExists) return userExists

    const user = this.userRepository.create({
      email,
    })

    await this.userRepository.save(user)

    return user
  }
}

export default UserService
