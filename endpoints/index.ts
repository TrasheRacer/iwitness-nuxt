/* eslint-disable no-console */
import express from 'express'
import cors from 'cors'
import { connect, LOCAL_DATABASE } from '../database/index'
import { GET_USER_BY_ID, GET_USERS } from './routes/users'
import { getPong as GET_PONG_FROM_PING } from './routes/ping'

const app = express()
app.use(cors())

const connection = connect(LOCAL_DATABASE)
connection.on('error', (err) => {
  console.error('Database connection', err)
})
connection.once('open', () => {
  console.info('Database connection is now open')
  app.use(GET_USER_BY_ID)
  app.use(GET_USERS)
  app.use(GET_PONG_FROM_PING)
})

// Start a standalone server if running directly.
if (require.main === module) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    console.log(`endpoints live on port ${port}`)
  })
}

export default app
