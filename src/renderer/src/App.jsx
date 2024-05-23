import { useEffect } from 'react'

// Router.
import AppRouter from './routes'

export default function Home() {
  useEffect(() => {
    console.log('window.api:', window.api)
  }, [])

  return <AppRouter />
}
