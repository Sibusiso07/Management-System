const { ipcMain } = require('electron')

import db from './db'

ipcMain.handle('login', async (_, username, password) => {
  try {
    const user = await db.query('SELECT * FROM employee WHERE username = $1 AND password = $2', [
      username,
      password
    ])

    return user
  } catch (error) {
    throw new Error('Error logging in')
  }
})
