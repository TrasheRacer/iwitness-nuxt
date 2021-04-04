import express from 'express'
import cors from 'cors'
import { connectDatabase, LOCAL_DATABASE } from '../database/index'
import { GET_USER_BY_ID, GET_USERS } from './routes/users'
import { getPong as GET_PONG_FROM_PING } from './routes/ping'

const app = express()
app.use(cors())

const connection = connectDatabase(LOCAL_DATABASE)
connection.on('error', (err) => {
  console.error(`connectDatabase(${LOCAL_DATABASE})`, err)
})
connection.once('open', () => {
  console.info(`connectDatabase(${LOCAL_DATABASE}): open`)
  app.use(GET_USER_BY_ID)
  app.use(GET_USERS)
  app.use(GET_PONG_FROM_PING)
})

// Start a standalone server if running directly.
if (require.main === module) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    console.info(`app.listen(${port}, ...)`)
  })
}

export default app
