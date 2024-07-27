import { useEffect } from 'react'

// Router.
import AppRouter from '@/routes'

// Context.
import { AuthProvider } from '@/context/AuthContext'
import { SettingsProvider } from '@/context/SettingsContext'

export default function Home() {
  // useEffect(() => {
  //   console.log('window.api:', window.api)
  // }, [])

  return (
    <AuthProvider>
      <SettingsProvider>
        <AppRouter />
      </SettingsProvider>
    </AuthProvider>
  )
}
