/* eslint-disable no-console */
import mongoose from 'mongoose'

export const LOCAL_DATABASE = 'mongodb://localhost:27017/iwitness-server'

export function connect(uri: string): mongoose.Connection {
  console.info('Connecting to database', uri)
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  return mongoose.connection
}
