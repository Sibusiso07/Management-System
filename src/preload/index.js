const { contextBridge, ipcRenderer } = require('electron')
const { electronAPI } = require('@electron-toolkit/preload')

// Custom APIs for renderer
const api = {
  // Login
  login: async (username, password) => {
    return ipcRenderer.invoke('login', username, password)
  },
  // Employee Registration
  employeeReg: async (
    employeeID,
    firstName,
    lastName,
    idNumber,
    email,
    department,
    position,
    password
  ) => {
    return ipcRenderer.invoke(
      'employeeReg',
      employeeID,
      firstName,
      lastName,
      idNumber,
      email,
      department,
      position,
      password
    )
  },
  // Client Registration
  clientReg: async (
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
    return ipcRenderer.invoke(
      'clientReg',
      firstName,
      middleName,
      lastName,
      idNumber,
      address,
      email,
      phoneNumber,
      packageType,
      idCopy
    )
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
