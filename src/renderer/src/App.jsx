import { useEffect } from 'react'

// Router.
import AppRouter from '@/routes'

// Auth Context.
import { AuthProvider } from '@/context/AuthContext'

export default function Home() {
  // useEffect(() => {
  //   console.log('window.api:', window.api)
  // }, [])

  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}
