import { serverWS as io } from '../server'
import ConnectionService from '../services/connections.service'
import MessageService from '../services/messages.service'

io.on('connect', async socket => {
  const connectionService = new ConnectionService()
  const messagesService = new MessageService()

  const allConnectionsWithoutAdmin = await connectionService.findAllWithoutAdmin()

  io.emit('admin_list_all_users', allConnectionsWithoutAdmin)

  socket.on('admin_list_messages_by_user', async (params, callback) => {
    const { user_id } = params

    const allMessages = await messagesService.getMessagesByUserId(user_id)

    callback(allMessages)
  })

  socket.on('admin_send_message', async params => {
    const { user_id, text } = params

    await messagesService.createMessage({
      text,
      user_id,
      admin_id: socket.id,
    })

    const connection = await connectionService.findConnectionByUserId(user_id)

    io.to(connection!.socket_id).emit('admin_send_to_client', {
      text: text,
      socket_id: socket.id,
    })
  })

  socket.on('admin_user_in_support', async params => {
    const { user_id } = params

    await connectionService.updateAdminId(user_id, socket.id)

    const allConnectionsWithoutAdmin = await connectionService.findAllWithoutAdmin()

    io.emit('admin_list_all_users', allConnectionsWithoutAdmin)
  })
})
