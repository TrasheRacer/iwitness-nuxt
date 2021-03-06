import express from 'express'
import { GET_USER } from './routes/users'
import { GET_PONG } from './routes/ping'

const app = express() // create express instance

app.use(GET_USER)
app.use(GET_PONG)

// Export express app
module.exports = app

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API server listening on port ${port}`)
  })
}
