import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import bodyParser from 'body-parser'
import jsonWebToken from 'jsonwebtoken'
import { expressjwt, Request as JWTRequest } from 'express-jwt'

const prisma = new PrismaClient()

const app: express.Application = express()

const port: number = 3000

// const jwtSecretPicks = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
// const jwtSecret = Array(10).fill(0)
//   .map(() => jwtSecretPicks.charAt(Math.round(Math.random() * jwtSecretPicks.length)))
//   .join('')
const jwtSecret = "abcdef345464"

app.use(cors())

app.use(bodyParser.json())

const usersEmailAndVerficationCode = {

}

app.post('/codeForvalidatingUser', async (_req, _res) => {
  const { verificationCode, userEmail } = _req.body
  if (verificationCode === usersEmailAndVerficationCode[userEmail]) {
    const userExists = await prisma.user.findMany({
      where: {
        email: userEmail
      }
    })
    if (userExists.length) {
      _res.status(200).json({
        success: true,
        token: jsonWebToken.sign({ userEmail }, jwtSecret, { expiresIn: '7d' })
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
        token: jsonWebToken.sign({ userEmail }, jwtSecret, { expiresIn: '7d' })
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

app.get('/user', expressjwt({ secret: jwtSecret, algorithms: ["HS256"] }),
  async (_req: JWTRequest, _res: express.Response) => {
    const userDetails = await prisma.user.findMany({
      where: {
        email: _req.auth.userEmail
      },
    })

    if (userDetails.length) {
      _res.status(200).json({
        success: true,
        username: userDetails[0].firstName
      })
    } else {
      _res.status(404).json({
        success: false,
      })
    }
  }
)

app.get('/user/channels', expressjwt({ secret: jwtSecret, algorithms: ["HS256"] }),
  async (_req: JWTRequest, _res: express.Response) => {
    const userChannels = await prisma.user.findMany({
      where:{
        email: _req.auth.userEmail
      },
      include: {
        channels: true
      }
    })
    _res.json(userChannels[0].channels)
  })

app.put('/user/channels', async (_req, _res) => {
  const { channelname, channelDescription, channelId, user } = _req.body

})

app.post('/channels', expressjwt({ secret: jwtSecret, algorithms: ["HS256"] }),
  async (_req: JWTRequest, _res: express.Response) => {
    const { channelName, channelDescription } = _req.body
    const addChannel = await prisma.channel.create({
      data: {
        name: channelName,
        description: channelDescription,
        users: {
          connect: [
            { email: _req.auth.userEmail },
          ]
        }
      }
    })
    _res.json(addChannel)
  })

app.get('/user/directMessages', expressjwt({ secret: jwtSecret, algorithms: ["HS256"] }),
  async (_req: JWTRequest, _res: express.Response) => {
    console.log(_req.body)
    _res.json({
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
    })
  })

app.put('/user/directMessages', async (_req, _res) => {
  const { channelname, channelDescription, channelId, user } = _req.body

})

app.get('/users', expressjwt({ secret: jwtSecret, algorithms: ["HS256"] }),
async(_req: JWTRequest, _res: express.Response) => {
  const users = await prisma.user.findMany()
  _res.json(users)
})

app.listen(port, () => {
  console.log(`TypeScript with Express
       http://localhost:${port}/`)
})



