import express from 'express'

const app: express.Application = express()

const port: number = 3000

app.get('/', (_req, _res) => {
  _res.send("TypeScript With Express");
})

app.get('/workspaceDetails', (_req, _res) => {
  _res.send(
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
})

app.listen(port, () => {
  console.log(`TypeScript with Express
       http://localhost:${port}/`)
})