// create a component that will display a header and sidebar on the left and allow for children to be rendered in the main content area on the right
// this component will be used to wrap all of the pages in the admin area

// Path: modules/common/components/layouts/AdminLayout.tsx
import { ReactNode } from 'react'
// import { useRouter } from 'next/router'
import Link from 'next/link'
import NavItem from '../NavItem'
import Aside from '../Aside'
import AdminHeader from '../AdminHeader'
// import { useSession } from 'next-auth/client'

// import { useUser } from '../../../lib/hooks'
// import { User } from '../../../interfaces'

type Props = {
  children: ReactNode
}

const AdminLayout = ({ children }: Props) => {
  // const [session, loading] = useSession()
  // const { user } = useUser(session?.user?.email)
  // const router = useRouter()

  // if (loading) {
  //   return <p>Loading...</p>
  // }

  // if (!session) {
  //   router.push('/admin/login')
  //   return null
  // }

  return (
    <div className='min-h-full md:h-screen w-full md:w-screen'>
      <AdminHeader />
      <div className='flex min-h-full'>
        <Aside />
        <main className='w-full lg:w-4/5'>{children}</main>
      </div>
    </div>
  )
}

export default AdminLayout
