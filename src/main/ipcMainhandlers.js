const { ipcMain } = require('electron')

import db from './db'
import bcrypt from 'bcrypt'

ipcMain.handle('login', async (_, username, password) => {
  try {
    // Getting the Password from the DB
    const userPassword = await db.query('SELECT password FROM Users WHERE username = $1', [
      username
    ])
    try {
      // Comparing the password entered to the DB password
      const match = await bcrypt.compare(password, userPassword)
      // If password matches then return match
      if (match) {
        return match
      } else {
        return 'Password does not match'
      }
    } catch (err) {
      console.error('Error comparing password: ', err)
    }
  } catch (error) {
    throw new Error('Error logging in')
  }
})

ipcMain.handle('employeeReg', async (_, employeeID, firstName, lastName, idNumber, email, department, position, password) => {
  // Hashing the password
  const saltRounds = 10
  const salt = bcrypt.genSalt(saltRounds)
  const hashedPassword = bcrypt.hash(password, salt)
  try {
    // Inserting into the User table
    const newUser = await db.query('INSERT INTO users (firstName, lastName, email, password) VALUES ($1, $2, $3, $4) RETURNING id', [
      firstName, lastName, email, hashedPassword
    ])
    try {
      // Inserting into the Employee table
      const newEmployee = await db.query(
        'INSERT INTO employees (employeeID, firstName, lastName, idNumber, email, department, position, userId) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
        [employeeID, firstName, lastName, idNumber, email, department, position, newUser]
      )
      return newEmployee
    } catch (err) {
      console.error('Error inserting into the employee table: ', err)
    }
  } catch (err) {
    console.error('Error inserting into the user table: ', err)
  }
})

ipcMain.handle(
  'clientReg',
  async (
    _,
    firstName,
    middleName,
    lastName,
    idNumber,
    address,
    email,
    phoneNumber,
    packageType,
    idCopy
  ) => {
    try {
      // Inserting into the User table
      const newUser = await db.query('INSERT INTO users (firstName, lastName, email) VALUES ($1, $2, $3) RETURNING id', [
        firstName, lastName, email
      ])
      try {
        // Incserting into Client table
        const newClient = await db.query(
          'INSERT INTO clients (firstName, middleName, lastName, idNumber, address, email, phoneNumber, packageType, idCopy) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
          [
            firstName,
            middleName,
            lastName,
            idNumber,
            address,
            email,
            phoneNumber,
            packageType,
            idCopy
          ]
        )
  
        return newClient
      } catch (error) {
        console.error('Error inserting into client table: ', err)
      }
    } catch (err) {
      console.error('Error inserting into user table: ', err)
    }
  }
)
