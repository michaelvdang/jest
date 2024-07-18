import express from 'express'
// import database from './database.js'

// 2. Dependency Injection: wrap app in a function and pass in database
export default function (database) {
  const app = express()

  app.use(express.json())

  app.post('/users', async (req, res) => {
    const {username, password} = req.body
    if (!username || !password) {
      res.status(400).send()
      return
    }
    
    try {
      const user = await database.getUser(username)
      if (user) {
        res.status(400).send({ error: "User already exists" })
        return
      }
      const userId = await database.createUser(username, password)
      res.send({ userId })
    }
    catch (error) {
      res.status(500).send({ error: "Database error" })
    }

  })


  return app
}

// export default app