// SettingsContext.js
import React, { createContext, useState } from 'react'

export const SettingsContext = createContext()

export const SettingsProvider = ({ children }) => {
  const [printer, setPrinter] = useState('')

  return <SettingsContext.Provider value={{ printer, setPrinter }}>{children}</SettingsContext.Provider>
}
