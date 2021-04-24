import { Request, Response } from 'express'

import User from '../entities/User'
import UserService from '../services/users.service'

interface UserBody {
  email: string
}

class UsersController {
  async create(req: Request, res: Response): Promise<Response<User>> {
    const { email } = req.body as UserBody

    const usersService = new UserService()
    const user = await usersService.createUser({ email })

    return res.status(201).json(user)
  }
}

export default UsersController
