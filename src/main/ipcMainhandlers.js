const { ipcMain } = require('electron')

import db from './db'
import bcrypt from 'bcrypt'

ipcMain.handle('login', async (_, username, password) => {
  try {
    // Hashing the password
    const salt = '$2b$10$Ix3.RczI6tN6/0TyfWPg.O'
    const hashedPassword = await bcrypt.hash(password, salt)
    // console.log('>>>>', username, password, hashedPassword)

    // Getting the Password from the DB
    const user = await db.query('SELECT * FROM users WHERE email = $1 AND password = $2', [
      username,
      hashedPassword
    ])

    if (!user) {
      console.error('No user matching details stored in the databse.', err)
    }

    return user
  } catch (err) {
    console.error('Error comparing password: ', err)
  }
})

ipcMain.handle(
  'employeeReg',
  async (_, employeeID, firstName, lastName, idNumber, email, department, position, password) => {
    // Hashing the password
    const salt = '$2b$10$Ix3.RczI6tN6/0TyfWPg.O'
    const hashedPassword = await bcrypt.hash(password, salt)

    // console.log('hashed >>>', email, password, hashedPassword)
    try {
      // Inserting into the User table
      const newUser = await db.query(
        'INSERT INTO users (firstName, lastName, email, password) VALUES ($1, $2, $3, $4) RETURNING id',
        [firstName, lastName, email, hashedPassword]
      )
      // Extracting userId
      const userId = newUser.rows[0].id
      try {
        // Inserting into the Employee table
        const newEmployee = await db.query(
          'INSERT INTO employees (employeeID, firstName, lastName, idNumber, email, department, position, userId) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
          [employeeID, firstName, lastName, idNumber, email, department, position, userId]
        )
        return { success: true, id: newEmployee.rows[0].id }
      } catch (err) {
        console.error('Error inserting into the employee table: ', err)
        return { success: false, error: 'Error inserting into the employee table' }
      }
    } catch (err) {
      console.error('Error inserting into the user table: ', err)
      return { success: false, error: 'Error inserting into the user table' }
    }
  }
)

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
    // Hashing the password
    const salt = '$2b$10$Ix3.RczI6tN6/0TyfWPg.O'
    const hashedPassword = await bcrypt.hash('password', salt)
    try {
      // Inserting into the User table
      const newUser = await db.query(
        'INSERT INTO users (firstName, lastName, email, password) VALUES ($1, $2, $3, $4) RETURNING id',
        [firstName, lastName, email, hashedPassword]
      )
      // Extracting userId
      const userId = newUser.rows[0].id
      try {
        // Incserting into Client table
        const newClient = await db.query(
          'INSERT INTO clients (firstName, middleName, lastName, idNumber, address, email, phoneNumber, packageType, idCopy, userid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
          [
            firstName,
            middleName,
            lastName,
            idNumber,
            address,
            email,
            phoneNumber,
            packageType,
            idCopy,
            userId
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
