import { UserProvider } from '@/src/components/hooks/userContext'
import RootLayout from '@/src/components/Layouts/RootLayout'
import '@/styles/globals.css'


export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
    <RootLayout>
      <Component {...pageProps} />

    </RootLayout>
    </UserProvider>

  )
}
