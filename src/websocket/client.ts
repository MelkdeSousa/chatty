import { serverWS as io } from '../server'
import ConnectionService from '../services/connections.service'
import MessageService from '../services/messages.service'
import UserService from '../services/users.service'

interface SocketParamsClientFirstAccess {
  text: string
  email: string
}

io.on('connect', socket => {
  const connectionService = new ConnectionService()
  const userService = new UserService()
  const messageService = new MessageService()

  let user_id: string | null = null
  const socket_id = socket.id

  socket.on('client_first_access', async params => {
    console.info(params)
    const { email, text } = params as SocketParamsClientFirstAccess

    const userExists = await userService.findUserByEmail(email)

    if (!userExists) {
      const user = await userService.createUser({ email })
      user_id = user.id

      await connectionService.createConnection({
        socket_id,
        user_id: user.id,
      })
    } else {
      user_id = userExists.id

      const connectionAlreadyExists = await connectionService.findConnectionByUserId(
        userExists.id
      )

      if (!connectionAlreadyExists) {
        await connectionService.createConnection({
          socket_id,
          user_id: userExists.id,
        })
      } else {
        await connectionService.createConnection({
          ...connectionAlreadyExists,
          socket_id,
        })
      }
    }

    await messageService.createMessage({
      text,
      user_id,
    })

    const allMessages = await messageService.getMessagesByUserId(user_id)

    socket.emit('client_list_all_messages', allMessages)

    const allUsers = await connectionService.findAllWithoutAdmin()

    io.emit('admin_list_all_users', allUsers)
  })

  socket.on('client_send_to_admin', async params => {
    const { text, socket_admin_id } = params
    const socket_id = socket.id

    const connection = await connectionService.findBySocketId(socket_id)

    const user_id = connection!.user_id

    const message = await messageService.createMessage({
      text,
      user_id,
    })

    io.to(socket_admin_id).emit('admin_receive_message', {
      message,
      socket_id,
    })
  })
})
