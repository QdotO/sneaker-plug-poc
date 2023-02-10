import Link from 'next/link'
import React from 'react'
import User from '../../../../interfaces/User'

type Props = {
  currentUser?: User
}

const UserSubNav = ({ currentUser }: Props) => {
  return (
    <div className='my-8 flex gap-4'>
      <Link
        href='/admin/users/create'
        className='bg-gray-300 hover:bg-blue-700 text-blue-700 hover:text-white font-bold py-2 px-4 rounded shadow-md'
      >
        Add User
      </Link>
      {currentUser && (
        <>
          <Link
            href={`/admin/users/edit/${currentUser.id}`}
            className='bg-gray-300 hover:bg-blue-700 text-blue-700 hover:text-white font-bold py-2 px-4 rounded shadow-md'
          >
            Edit User
          </Link>
          <Link
            href={`/admin/users/delete/${currentUser.id}`}
            className='bg-gray-300 hover:bg-blue-700 text-blue-700 hover:text-white font-bold py-2 px-4 rounded shadow-md'
          >
            Delete User
          </Link>
        </>
      )}
    </div>
  )
}

export default UserSubNav
