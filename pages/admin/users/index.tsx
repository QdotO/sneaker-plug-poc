// generate a nextjs typescript page that displays a list of users retrieved from a call to queryDatabase() in the lib/db.ts file for all users in the users table
// to display the users, use the User interface
// the page should be accessible at /admin/users
// the users should be displayed in a table with the following columns based on the User interface in the interfaces/User.ts file

import React, { useState } from 'react'
import { GetServerSideProps } from 'next'
import User from '../../../interfaces/User'
import Layout from '../../../modules/common/components/Layout'
import { queryDatabase } from '../../../lib/db'
import UserCard from '../../../modules/account/components/admin/UserCard'
import UserSubNav from '../../../modules/account/components/admin/UserSubNav'

type Props = {
  users?: User[]
  deletedUsers?: User[]
  errors?: string
}

const Users = ({ users, deletedUsers, errors }: Props) => {
  const [currentUser, setCurrentUser] = useState<User>()
  const [currentDeletedUser, setCurrentDeletedUser] = useState<User>()
  if (errors) {
    return (
      <Layout>
        <p>
          <span>There was an error retrieving the users:</span>
          <span>{errors}</span>
        </p>
      </Layout>
    )
  }

  return (
    <div>
    <div className='p-4 my-8'>
      <h1 className='text-3xl mb-8'>Users</h1>
      <div className='flex flex-col'>
        <UserSubNav currentUser={currentUser} />
        {currentUser && <UserCard currentUser={currentUser} />}
      </div>
      <div>
        <table className='table-auto w-full mx-auto overflow-x-scroll'>
          <thead className='overflow-scroll'>{getHeaders(users)}</thead>
          <tbody>
            {users.map((user) => (
              <tr
                className='cursor-pointer'
                onClick={() => setCurrentUser(user)}
              >
                {getColumns(user)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    {deletedUsers.length > 0 && <div className='p-4 my-8'>
      <h1 className='text-3xl mb-8'>Deleted Users</h1>
      <div className='flex flex-col'>
        {currentUser && <UserCard currentUser={currentDeletedUser} />}
      </div>
      <div>
        <table className='table-auto w-full mx-auto overflow-x-scroll'>
          <thead className='overflow-scroll'>{getHeaders(deletedUsers)}</thead>
          <tbody>
            {deletedUsers.map((user) => (
              <tr
                className='cursor-pointer'
                onClick={() => setCurrentUser(user)}
              >
                {getColumns(user)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>}
    </div>
  )
}

// 5. Create a getStaticProps function that will retrieve the users from the database
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const results = (await queryDatabase(
      'SELECT * FROM sneakers.users'
    )) as any[]
    const users = results.map((user) => ({ ...user }))
    const activeUsers = users.filter((user) => user.deletedAt === null)
    const deletedUsers = users.filter((user) => user.deletedAt !== null)
    console.log({ activeUsers, deletedUsers })

    return { props: { users: activeUsers, deletedUsers } }
  } catch (err: any) {
    return { props: { errors: err.message } }
  }
}

function getHeaders(users) {
  let headers = []
  for (let key in users[0]) {
    if (key !== 'password' && headers.length < 5) {
      headers.push(<th className='px-4 py-2 text-start'>{key}</th>)
    }
  }

  return headers
}

function getColumns(user) {
  let columns = []
  for (let key in user) {
    if (key !== 'password' && columns.length < 5) {
      columns.push(<td className='border px-4 py-2'>{user[key]}</td>)
    }
  }

  return columns
}

export default Users
