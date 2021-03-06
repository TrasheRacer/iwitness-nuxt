import { Router } from 'express'

const router = Router()
const users = [{ name: 'Alexandre' }, { name: 'Pooya' }, { name: 'Sébastien' }]

export const GET_USERS = router.get('/users', function (_req, res, _next) {
  res.json(users)
})

export const GET_USER = router.get('/users/:id', function (req, res, _next) {
  const id = parseInt(req.params.id)
  if (id >= 0 && id < users.length) {
    res.json(users[id])
  } else {
    res.sendStatus(404)
  }
})
