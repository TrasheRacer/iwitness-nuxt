import { Router } from 'express'
import { USER_MODEL } from '../../database/models/user.model'
import { FormModel } from '../../pages/user/FormModel'

const router = Router()

export const READ_USER = router.get(
  '/user/:id',
  async function (req, res, _next) {
    const id = req.params.id
    const user = await USER_MODEL.findById(id).exec()
    res.json(user)
  }
)

export const READ_USERS = router.get(
  '/users',
  async function (_req, res, _next) {
    const users = await USER_MODEL.find().exec()
    res.json(users)
  }
)

export const CREATE_USER = router.put(
  '/user/:id',
  async function (req, res, _next) {
    console.debug(`router.put('/user/:id')`)
    const id = req.params.id
    const alreadyExists = await USER_MODEL.exists({ _id: id })
    if (!alreadyExists) {
      const form: FormModel = req.body
      const contact = form.phone
        ? { email: form.email, phone: form.phone }
        : { email: form.email }
      const agreed = {
        termsOfUse: form.agreeTermsOfUse,
        newsletter: form.agreeNewsletter,
      }
      const newUser = new USER_MODEL({ _id: id, contact, agreed })
      newUser.save()
      console.info('newUser.save()', newUser)
      res.sendStatus(201)
    } else {
      console.error(`USER_MODEL.exists({ _id: ${id} })`)
      res.sendStatus(400)
    }
  }
)
