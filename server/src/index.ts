import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import bodyParser from 'body-parser'

const prisma = new PrismaClient()

const app: express.Application = express()

const port: number = 3000

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

app.post('/codeForvalidatingUser', (_req, _res) => {
  const { verificationCode, userEmail } = _req.body
  console.log(_req.body, usersEmailAndVerficationCode)
  if (verificationCode === usersEmailAndVerficationCode[userEmail]) {
    _res.send(JSON.stringify({
      success: true
    }))
  }else {
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
      message,
      channelId,
      userId
    },
  })
  _res.json(userMessage)
})

app.listen(port, () => {
  console.log(`TypeScript with Express
       http://localhost:${port}/`)
})



