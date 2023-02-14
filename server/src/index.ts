import express from 'express'
import cors from 'cors'

const app: express.Application = express()

const port: number = 3000

app.use(cors());

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

app.get('/CodeForvalidatingUser', (_req, _res) => {
  _res.send(JSON.stringify({
    success: true
  }))
})

app.get('/userEmailAddress', (_req, _res) => {
  _res.send(JSON.stringify({
    success: true
  }))
})

app.listen(port, () => {
  console.log(`TypeScript with Express
       http://localhost:${port}/`)
})



