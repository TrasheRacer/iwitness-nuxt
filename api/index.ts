import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { connectDatabase, LOCAL_DATABASE } from '../database/index'
import { CREATE_USER, READ_USER, READ_USERS } from './routes/users'
import { getPong as GET_PONG_FROM_PING } from './routes/ping'

const app = express()
app.use(cors())
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const connection = connectDatabase(LOCAL_DATABASE)
connection.on('error', (err) => {
  console.error(`connectDatabase(${LOCAL_DATABASE})`, err)
})
connection.once('open', () => {
  console.info(`connectDatabase(${LOCAL_DATABASE}): open`)
  app.use(READ_USER)
  app.use(READ_USERS)
  app.use(CREATE_USER)
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
