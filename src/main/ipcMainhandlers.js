const { ipcMain } = require('electron')

import executeFunction from './api'
import db from './db'
import bcrypt from 'bcrypt'

ipcMain.handle('login', async (_, username, password) => {
  try {
    // Hashing the password
    const salt = process.env.ENCRYPTION_SECRET
    const hashedPassword = await bcrypt.hash(password, salt)

    // Attempt to authenticate the user.
    const result = await executeFunction('user_Authentication', {
      p_email_address: username,
      p_password: hashedPassword
    })

    // If user does not exists, raise error.
    if (result.length === 0) {
      console.error('No user matching details stored in the database.')
      return null
    }

    return result[0] // Return the first user found.
  } catch (err) {
    console.error('Error authenticating user: ', err)
    throw err
  }
})

ipcMain.handle(
  'employeeReg',
  async (_, employeeID, firstName, lastName, idNumber, email, department, position, password) => {
    try {
      // Hashing the password. $2b$10$Ix3.RczI6tN6/0TyfWPg.O
      const salt = process.env.ENCRYPTION_SECRET
      const hashedPassword = await bcrypt.hash(password, salt)

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
      throw err
    }
  }
)

ipcMain.handle(
  'clientReg',
  async (_, firstName, middleName, lastName, idNumber, address, email, phoneNumber, idCopy) => {
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
      throw err
    }
  }
)

// Adding Package into DB.
// ipcMain.handle('addPackage', async (_, packageID, packageName, details, price, base64String) => {
//   try {
//     // Inserting into the Employee table
//     const result = await executeFunction('package_Registration', {
//       p_package_id: packageID,
//       p_package_name: packageName,
//       p_details: details,
//       p_price: price,
//       p_image: base64String
//     })

//     // If package is registered.
//     return result
//   } catch (err) {
//     console.error('Error inserting into the user table: ', err)
//     throw err
//   }
// })

// Getting Package Info from the DB.
ipcMain.handle('getPackage', async () => {
  try {
    const packageInfo = await executeFunction('get_Packages')
    // If there is results, return results.
    if (packageInfo) {
      return packageInfo
    }
  } catch (err) {
    console.error('Unable get data from DB: ', err)
    throw err
  }
})

// Search for package.
ipcMain.handle('findPackage', async (_, packageID) => {
  try {
    const found = await executeFunction('find_package', { p_package_id: packageID })
    return found
  } catch (err) {
    console.error('Error accessing the DB: ', err)
    throw err
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
        p_image: base64String
      })
      return { success: true, id: updatedPackage[0].id }
    } catch (err) {
      console.error('Error updating package: ', err)
      throw err
    }
  }
)

// Add Dependent to the DB.
ipcMain.handle('addDependent', async (_, firstname, lastname, idnumber, clientId) => {
  try {
    const newDependent = await executeFunction('add_Dependant', {
      p_first_name: firstname,
      p_last_name: lastname,
      p_id_number: idnumber,
      p_client_id: clientId
    })
    return { success: true }
  } catch (err) {
    console.error('Error adding dependent: ', err)
    throw err
  }
})

// Getting the dependants linked to the client.
ipcMain.handle('getDependants', async (_, clientId) => {
  try {
    const results = await executeFunction('get_Dependants', {
      p_client_id: clientId
    })
    return results
  } catch (err) {
    console.error('Unable to fetch dependants: ', err)
    throw err
  }
})

// Linking package items.
ipcMain.handle('linkPackageItems', async (_, package_id, selectedItems) => {
  try {
    await executeFunction('link_package_items', {
      p_package_id: package_id,
      p_item_ids: selectedItems
    })
  } catch (err) {
    console.error('Unable to link package items: ', err)
    throw err
  }
})

// Getting all items from the db.
ipcMain.handle('getItems', async () => {
  try {
    const packageItems = await executeFunction('get_all_package_items')
    return packageItems
  } catch (err) {
    console.error('Unable to fetch package items: ', err)
    throw err
  }
})

// Get selected package items.
ipcMain.handle('getPackageItems', async (_, package_id) => {
  try {
    const selectedItems = await executeFunction('get_selected_package_items', {
      p_package_id: package_id
    })
    return selectedItems
  } catch (err) {
    console.error('Failed to fetch selected package items: ', err)
    throw err
  }
})

// Linking package items.
ipcMain.handle('linkClientPackage', async (_, user_id, package_id) => {
  try {
    console.log('triggered : linkClientPackage')
    const result = await executeFunction('link_user_to_package', {
      p_client_id: user_id,
      p_package_id: package_id
    })
    console.log('Result >>>', result)
    return result
  } catch (err) {
    console.error('Unable to link client to package: ', err)
    throw err
  }
})

// Linking package items.
ipcMain.handle('addCardInfo', async (_, cardNumber, cardholderName, expiryDate, cvv, user_id) => {
  try {
    const result = await executeFunction('insert_payment_information', {
      p_card_number: cardNumber,
      p_card_holder: cardholderName,
      p_expiry_date: expiryDate,
      p_cvv: cvv,
      p_client_id: user_id
    })
    return result
  } catch (err) {
    console.error('Unable to link client to package: ', err)
    throw err
  }
})

// Getting the active package linked to the client.
ipcMain.handle('getActivePackage', async (_, clientId) => {
  try {
    const results = await executeFunction('get_active_package', {
      p_client_id: clientId
    })
    return results
  } catch (err) {
    console.error('Unable to fetch dependants: ', err)
    throw err
  }
})

// Execute database fucntion.
ipcMain.handle('executeFunction', async (_, functionName, paramlist) => {
  try {
    const result = await executeFunction(functionName, paramlist)
    console.log('result >>>', result)
    return result
  } catch (err) {
    console.error('ipcHandlers -> executeFunction -> : ', err)
    throw err
  }
})
