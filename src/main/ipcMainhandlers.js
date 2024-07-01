const { ipcMain } = require('electron')

import executeFunction from './api'
import db from './db'
import bcrypt from 'bcrypt'

ipcMain.handle('login', async (_, username, password) => {
  try {
    // Hashing the password
    const salt = process.env.ENCRYPTION_SECRET
    const hashedPassword = await bcrypt.hash(password, salt)
    // console.log('>>>>', username, password, hashedPassword)

    // Attempt to authenticate the user.
    const result = await executeFunction('user_Authentication', {
      p_email_address: username,
      p_password: hashedPassword
    })

    console.log('authentication result >>>', result)

    // If user does not exists, raise error.
    if (result.length === 0) {
      console.error('No user matching details stored in the database.')
      return null
    }

    return result[0] // Return the first user found.
  } catch (err) {
    console.error('Error authenticating user: ', err)
  }
})

ipcMain.handle(
  'employeeReg',
  async (_, employeeID, firstName, lastName, idNumber, email, department, position, password) => {
    try {
      // Hashing the password. $2b$10$Ix3.RczI6tN6/0TyfWPg.O
      const salt = process.env.ENCRYPTION_SECRET
      const hashedPassword = await bcrypt.hash(password, salt)

      // console.log('hashed >>>', email, password, hashedPassword)

      // Inserting employee into DB.
      const result = await executeFunction('employee_Registration', {
        p_employee_id: employeeID,
        p_first_name: firstName,
        p_last_name: lastName,
        p_id_number: idNumber,
        p_email: email,
        p_department: department,
        p_position: position,
        p_password: hashedPassword
      })

       // If employee is registered, raise error.
      if (result.length === 0) {
        console.error('Failed to store employee details in the database.')
        return null
      }

      return result[0] // Return if employee is successfully registered.
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

      // Inserting client into DB.
      const result = await executeFunction('client_Registration', {
        p_first_name: firstName,
        p_middle_name: middleName,
        p_last_name: lastName,
        p_id_number: idNumber,
        p_address: address,
        p_email: email,
        p_phone_number: phoneNumber,
        p_package_type: packageType,
        p_id_copy: idCopy,
        p_password: hashedPassword
      })

       // If client is registered, raise error.
      if (result.length === 0) {
        console.error('Failed to store client details in the database.')
        return null
      }

      return result[0] // Return if employee is successfully registered.
    } catch (err) {
      console.error('Error inserting into user table: ', err)
    }
  }
)

// Adding Package into DB.
ipcMain.handle('addPackage', async (_, packageID, packageName, details, price, base64String) => {
  try {
    // Inserting into the Employee table
    const result = await executeFunction('package_Registration', {
      p_package_id: packageID,
      p_package_name: packageName,
      p_details: details,
      p_price: price,
      p_image: base64String,
    })
    
    // If package is registered.
    return { success: true, id: result.rows[0].id }
  } catch (err) {
    console.error('Error inserting into the user table: ', err)
    return { success: false, error: 'Error inserting into the user table' }
  }
})

// Getting Package Info from the DB.
ipcMain.handle('getPackage', async () => {
  try {
    const packageInfo = await executeFunction('get_packages')
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
ipcMain.handle('findPackage', async (_, packageID) => {
  try {
    const found = await executeFunction('find_package', {p_package_id: packageID})
    return found.rows
  } catch (err) {
    console.error('Error accessing the DB: ', err)
  }
})

// Editing package on the DB.
ipcMain.handle(
  'editPackage',
  async (_, id, packageID, packageName, details, price, base64String) => {
    try {
      // Updating the packages table
      const updatedPackage = await executeFunction('package_Update', {
        p_id: id,
        p_package_id: packageID,
        p_package_name: packageName,
        p_details: details,
        p_price: price,
        p_image: base64String,
      })
      return { success: true, id: updatedPackage.rows[0].id }
    } catch (err) {
      console.error('Error updating package: ', err)
      return { success: false, error: 'Error updating package' }
    }
  }
)
