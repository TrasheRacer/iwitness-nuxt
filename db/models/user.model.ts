import mongoose from 'mongoose'

const USER_SCHEMA = new mongoose.Schema(
  {
    _id: String,
    created: { type: Date, default: Date.now },
    contact: {
      email: String,
      phone: String, // may be null!
    },
    agreed: {
      termsOfUse: Boolean,
      newsletter: Boolean,
    },
  },
  { collection: 'users' }
)

export const USER_MODEL = mongoose.model('user', USER_SCHEMA)
