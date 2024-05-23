/* eslint-disable prettier/prettier */
import pg from 'pg'
import * as dotenv from 'dotenv'

dotenv.config()

const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'FPMS',
  password: process.env.DB_PASSWORD,
  port: 5432
})

db.connect((err) => {
  if (err) {
    console.error('Connection to the database failed', err.stack)
  } else {
    console.log('Connected to the database')
  }
})

export default db
