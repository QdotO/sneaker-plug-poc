import { useRouter } from 'next/router'
import AdminLayout from '../modules/common/components/layouts/AdminLayout'
import '../styles/global.css'

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const { pathname } = router

  if (pathname.includes('/admin')) {
    return (
      <AdminLayout>
        <Component {...pageProps} />
      </AdminLayout>
    )
  }

  return <Component {...pageProps} />
}
