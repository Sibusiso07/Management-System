// AuthContext.js
import React, { createContext, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [packageItem, setPackageItem] = useState(null)

  return <AuthContext.Provider value={{ user, setUser, packageItem, setPackageItem }}>{children}</AuthContext.Provider>
}
