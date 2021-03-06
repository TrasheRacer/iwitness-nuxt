import { Router } from 'express'

const router = Router()

export const GET_PONG = router.get('/ping', function (_req, res, _next) {
  res.json('pong')
})
