import mongoose from 'mongoose'

export const LOCAL_DATABASE = 'mongodb://localhost:27017/iwitness-server'

export function connectDatabase(uri: string): mongoose.Connection {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  return mongoose.connection
}
