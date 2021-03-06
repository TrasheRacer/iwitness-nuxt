import mongoose from 'mongoose'

const USER_SCHEMA = new mongoose.Schema(
  {
    _id: String,
    email: String,
  },
  { collection: 'users' }
)

export const USER_MODEL = mongoose.model('user', USER_SCHEMA)
