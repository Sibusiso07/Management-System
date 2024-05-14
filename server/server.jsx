/* eslint-disable prettier/prettier */
import express from 'express'
import cors from 'cors'
import pg from 'pg'
import * as dotenv from 'dotenv'
import bcrypt from 'bcrypt'

const router = express()
dotenv.config()

router.use(cors())
router.use(express.urlencoded({ extended: true }))
router.use(express.json())

const saltRounds = 5

const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'FPMS',
  password: process.env.DB_PASSWORD,
  port: 5432
})
db.connect()

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    bcrypt.hash(password, saltRounds, async function (err, hash) {
      const user = await db.query('SELECT * FROM employee WHERE username = $1', [username])
      const results = user.rows
      if (user) {
        if (hash === results[0].password) {
          res.status(200).json({ message: 'Login Successful' })
        } else {
          res.status(401).json({ message: 'Incorrect Password' })
        }
      } else {
        res.status(404).json({ message: 'User does not exist' })
      }
    })
  } catch (error) {
    console.error('Error during login attempt', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

router.listen(3001, () => {
  console.log('Server running on port 3001')
})
