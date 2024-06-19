const { ipcMain } = require('electron')

import db from './db'
import bcrypt from 'bcrypt'

ipcMain.handle('login', async (_, username, password) => {
  try {
    // Hashing the password
    const salt = process.env.ENCRYPTION_SECRET
    const hashedPassword = await bcrypt.hash(password, salt)
    // console.log('>>>>', username, password, hashedPassword)

    // Checking if user exists in the DB for email & password combination.
    const result = await db.query('SELECT * FROM users WHERE email = $1 AND password = $2', [
      username,
      hashedPassword
    ])
    // If user does not exists, raise error.
    if (result.rows.length === 0) {
      console.error('No user matching details stored in the database.')
      return null
    }

    return result.rows[0] // Return the first user found.
  } catch (err) {
    console.error('Error comparing password: ', err)
  }
})

ipcMain.handle(
  'employeeReg',
  async (_, employeeID, firstName, lastName, idNumber, email, department, position, password) => {
    try {
      // Hashing the password
      const salt = process.env.ENCRYPTION_SECRET
      const hashedPassword = await bcrypt.hash(password, salt)

      // console.log('hashed >>>', email, password, hashedPassword)

      // Inserting into the User table
      const newUser = await db.query(
        'INSERT INTO users (firstName, lastName, email, password) VALUES ($1, $2, $3, $4) RETURNING id',
        [firstName, lastName, email, hashedPassword]
      )
      // Extracting userId
      const userId = newUser.rows[0].id

      // Inserting into the Employee table
      const newEmployee = await db.query(
        'INSERT INTO employees (employeeID, firstName, lastName, idNumber, email, department, position, userId) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
        [employeeID, firstName, lastName, idNumber, email, department, position, userId]
      )
      return { success: true, id: newEmployee.rows[0].id }
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
    try {
      // Hashing the password
      const salt = process.env.ENCRYPTION_SECRET
      const hashedPassword = await bcrypt.hash('password', salt)

      // Inserting into the User table
      const newUser = await db.query(
        'INSERT INTO users (firstName, lastName, email, password) VALUES ($1, $2, $3, $4) RETURNING id',
        [firstName, lastName, email, hashedPassword]
      )
      // Extracting userId
      const userId = newUser.rows[0].id

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
    } catch (err) {
      console.error('Error inserting into user table: ', err)
    }
  }
)

// Adding Package into DB.
ipcMain.handle('addPackage', async (_, packageID, packageName, details, price, base64String) => {
  try {
    // Inserting into the Employee table
    const newPackage = await db.query(
      'INSERT INTO packages (package_id, package_name, details, price, image) VALUES ($1, $2, $3, $4, $5)',
      [packageID, packageName, details, price, base64String]
    )
    return { success: true, id: newPackage.rows[0].id }
  } catch (err) {
    console.error('Error inserting into the user table: ', err)
    return { success: false, error: 'Error inserting into the user table' }
  }
})

// Getting Package Info from the DB.
ipcMain.handle('getPackage', async () => {
  try {
    const packageInfo = await db.query('SELECT * FROM packages')
    // If there is results, return results.
    if (packageInfo) {
      // console.log("Packages >>>> ", packageInfo.rows)
      return packageInfo.rows
    }
  } catch (err) {
    console.error('Unable get data from DB: ', err)
  }
})

// Search for package.
ipcMain.handle('findPackage', async (_, packageName) => {
  try {
    const found = await db.query('SELECT * FROM packages WHERE package_name = $1', [packageName])
    return found.rows
  } catch (err) {
    console.error('No such package exists: ', err)
  }
})

// Editing package on the DB.
ipcMain.handle('editPackage', async (_, id, packageID, packageName, details, price, base64String) => {
  try {
    // Updating the packages table
    const updatedPackage = await db.query(
      'UPDATE packages SET package_id = $2, package_name = $3, details = $4, price = $5, image = $6 WHERE id = $1',
      [id, packageID, packageName, details, price, base64String]
    );
    return { success: true, id: newPackage.rows[0].id }
  } catch (err) {
    console.error('Error updating package: ', err)
    return { success: false, error: 'Error updating package' }
  }
})
