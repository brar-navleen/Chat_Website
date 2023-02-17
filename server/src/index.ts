import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import bodyParser from 'body-parser'
import jsonWebToken from 'jsonwebtoken'

const prisma = new PrismaClient()

const app: express.Application = express()

const port: number = 3000

const jwtSecretPicks = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
const jwtSecret = Array(10).fill(0)
  .map(() => jwtSecretPicks.charAt(Math.round(Math.random() * jwtSecretPicks.length)))
  .join('')
console.log(jwtSecret)

app.use(cors())

app.use(bodyParser.json())

const usersEmailAndVerficationCode = {

}


app.get('/workspaceDetails', (_req, _res) => {
  _res.send(JSON.stringify(
    {
      displayName: "Aman",
      displayChannels: [
        { name: "general" },
        { name: "random" },
        { name: "project" }
      ],
      listOfPeopleDirectMsgIsSentTo: [
        {
          id: 1,
          usersInvolved: [
            {
              id: 1,
              name: 'Navleen'
            },
            {
              id: 2,
              name: 'Satnam'
            }
          ]
        },
        {
          id: 2,
          usersInvolved: [
            {
              id: 1,
              name: 'Ravleen'
            },
          ]
        }
      ]
    }
  )
  )
})

app.post('/codeForvalidatingUser', async (_req, _res) => {
  const { verificationCode, userEmail } = _req.body
  console.log(_req.body, usersEmailAndVerficationCode)
  if (verificationCode === usersEmailAndVerficationCode[userEmail]) {
    const userExists = await prisma.user.findMany({
      where: {
        email: userEmail
      }
    })
    if (userExists.length) {
      _res.status(200).json({
        success: true,
        token: jsonWebToken.sign({userEmail}, jwtSecret,  { expiresIn: '1 day' })
      })
    }
    else {
      await prisma.user.create({
        data: {
          email: userEmail
        },
      })
      _res.status(200).json({
        success: true,
        isNewUser: true,
        token: jsonWebToken.sign({userEmail}, jwtSecret,  { expiresIn: '1 day' })
      })
    }
  } else {
    _res.send(JSON.stringify({
      success: false
    }))
  }
})

app.post('/userLogInEmailAddresstoSendCode', (_req, _res) => {
  const { emailAddress } = _req.body
  usersEmailAndVerficationCode[emailAddress] = '123456'

  console.log(usersEmailAndVerficationCode)
  _res.send(JSON.stringify({
    success: true
  }))
})

app.post('/message', async (_req, _res) => {
  console.log(_req.body)
  const { message, channelId, userId } = _req.body
  const userMessage = await prisma.message.create({
    data: {
      message: message,
      channelId: channelId,
      userId: userId
    },
  })
  _res.json(userMessage)
})

app.put('/sendUserProfileDetails', async (_req, _res) => {
  console.log(_req.body)
  const { firstName, lastName, username, userEmailAddress } = _req.body
  await prisma.user.update({
    where: {
      email: userEmailAddress
    },
    data: {
      firstName: firstName,
      lastName: lastName,
      username: username
    },
  })
})

app.listen(port, () => {
  console.log(`TypeScript with Express
       http://localhost:${port}/`)
})



