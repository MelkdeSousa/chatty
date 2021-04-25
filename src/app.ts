import './websocket/client'
import { serverHttp } from './server'

const PORT = 3333

serverHttp.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`)
})
