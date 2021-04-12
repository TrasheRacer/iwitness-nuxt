import { Router } from 'express'
import nodemailer from 'nodemailer'
import { USER_MODEL } from '../../db/models/user.model'
import { FormModel } from '../../pages/user/FormModel'

const router = Router()

console.info('nodemailer.createTransport(...)')
const transporter = nodemailer.createTransport({
  host: '127.0.0.1',
  port: 1025,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'iwitness.noreply@pm.me',
    pass: 'XXXXXXXXXX', // real pass goes here
  },
  tls: {
    rejectUnauthorized: false,
  },
})

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

      console.info('newUser.save()', newUser)
      newUser.save()

      // TODO: see whether debug shows up in console
      console.debug('transporter.sendMail(...)')
      await transporter
        .sendMail({
          from: '"Me" <iwitness.noreply@pm.me>',
          to: contact.email,
          subject: 'Hello!',
          text: 'Hello world?',
          html: '<b>Hello world?</b>',
        })
        .then((info) => {
          console.debug('info.messageId: %s', info.messageId)
        })
        .catch((error) => {
          console.error(error)
        })

      console.debug('res.sendStatus(201)')
      res.sendStatus(201)
    } else {
      console.error(`USER_MODEL.exists({ _id: ${id} })`)
      res.sendStatus(400)
    }
  }
)
