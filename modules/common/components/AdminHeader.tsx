import React from 'react'

type Props = {}

const AdminHeader = (props: Props) => {
  return (
    <header className='flex justify-between h-16 bg-gray-400 text-white items-center px-8 shadow-md'>
      <h1 className='text-xl font-bold'>The Snkr Plug</h1>
      <div>Admin</div>
    </header>
  )
}

export default AdminHeader
