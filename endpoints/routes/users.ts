import { Router } from 'express'
import { USER_MODEL } from '../../database/models/user.model'

const router = Router()

export const GET_USER_BY_ID = router.get(
  '/user/:id',
  async function (req, res, _next) {
    const id = req.params.id
    const user = await USER_MODEL.findById(id).exec()
    res.json(user)
  }
)

export const GET_USERS = router.get(
  '/users',
  async function (_req, res, _next) {
    const users = await USER_MODEL.find().exec()
    res.json(users)
  }
)
