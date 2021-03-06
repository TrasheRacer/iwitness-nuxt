import { Router } from 'express'

const router = Router()

export const getPong = router.get('/ping', function (_req, res, _next) {
  res.json('pong')
})
