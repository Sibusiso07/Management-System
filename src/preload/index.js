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
      idCopy
    )
  },
  // New Package Registration.
  // addPackage: async (packageID, packageName, details, price, base64String) => {
  //   return ipcRenderer.invoke('addPackage', packageID, packageName, details, price, base64String)
  // },
  // Get Package data from the DB.
  getPackage: async () => {
    return ipcRenderer.invoke('getPackage')
  },
  // Search for Specific package
  findPackage: async (packageID) => {
    return ipcRenderer.invoke('findPackage', packageID)
  },
  // Editing a package.
  editPackage: async (id, packageID, packageName, details, price, base64String) => {
    return ipcRenderer.invoke(
      'editPackage',
      id,
      packageID,
      packageName,
      details,
      price,
      base64String
    )
  },
  // Add Dependents.
  addDependent: async (firstname, lastname, idnumber, clientId) => {
    return ipcRenderer.invoke('addDependent', firstname, lastname, idnumber, clientId)
  },
  // Getting client dependants from the DB.
  getDependants: async (clientId) => {
    return ipcRenderer.invoke('getDependants', clientId)
  },
  // Get Package Items from the DB.
  getItems: async () => {
    return ipcRenderer.invoke('getItems')
  },
  // Linking Package Items to Packages on the DB.
  linkPackageItems: async (package_id, selectedItems) => {
    return ipcRenderer.invoke('linkPackageItems', package_id, selectedItems)
  },
  // Linking Package Items to Packages on the DB.
  linkClientPackage: async (user_id, package_id) => {
    return ipcRenderer.invoke('linkClientPackage', user_id, package_id)
  },
  // Adding Card Information on the DB.
  addCardInfo: async (cardNumber, cardholderName, expiryDate, cvv, user_id) => {
    return ipcRenderer.invoke('addCardInfo', cardNumber, cardholderName, expiryDate, cvv, user_id)
  },
  // Get selected package items
  getPackageItems: async (package_id) => {
    return ipcRenderer.invoke('getPackageItems', package_id)
  },
  // Get printers
  getPrinters: async () => {
    return ipcRenderer.invoke('getPrinters')
  },
  // Print report
  printReport: async (printerName, reportContent) => {
    return ipcRenderer.invoke('printReport', printerName, reportContent)
  },
  // Getting active package.
  getActivePackage: async (clientId) => {
    return ipcRenderer.invoke('getActivePackage', clientId)
  },
  // Getting active package.
  executeFunction: async (functionName, paramlist) => {
    return ipcRenderer.invoke('executeFunction', functionName, paramlist)
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
