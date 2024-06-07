const { ipcMain } = require('electron')

import db from './db'
import bcrypt from 'bcrypt'

ipcMain.handle('login', async (_, username, password) => {
  const saltRounds = 10
  const salt = bcrypt.genSalt(saltRounds)
  const encyptedPassword = bcrypt.hash(password, salt)
  console.log(encyptedPassword)
  try {
    const user = await db.query('SELECT * FROM employees WHERE username = $1 AND password = $2', [
      username,
      encyptedPassword
    ])

    return user
  } catch (error) {
    throw new Error('Error logging in')
  }
})

ipcMain.handle(
  'userReg',
  async (_, employeeID, firstName, lastName, idNumber, email, department, position) => {
    try {
      const newUser = await db.query(
        'INSERT INTO employees (employeeID, firstName, lastName, idNumber, email, department, position) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [employeeID, firstName, lastName, idNumber, email, department, position]
      )

      return newUser
    } catch (error) {
      console.error(error)
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
    try {
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
      console.error(error)
    }
  }
)
