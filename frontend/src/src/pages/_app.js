import '@/styles/globals.css'
import Layout from '../components/Layout'
import { AUthProvider } from '@/context/AuthContext'

export default function App({ Component, pageProps }) {
  return (
    <AUthProvider>
      <Layout>
          <Component {...pageProps} />
      </Layout>
    </AUthProvider>
  )
}
