import React, { ReactNode, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../../../modules/common/components/Layout'
import Form from '../../../../modules/common/components/Form'
import { queryDatabase } from '../../../../lib/db'
import User from '../../../../interfaces/User'
import { GetServerSideProps } from 'next'

// 21. Create a type for the props that will be passed to the component

type Props = {
  errors?: string
  user: User
}

// 22. Create a component that will display a list of users

const UserEdit = ({ errors, user }: Props) => {
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    console.log(`User edit form change`)
  }

  const handleSubmit = async (user: User) => {
    try {
      await queryDatabase(
        'UPDATE users SET firstName = ?, lastName = ?, email = ?, phone = ?, streetAddress = ?, streetAddress2 = ?, city = ?, state = ?, zipCode = ?, emailVerified = ?, isAdmin = ? WHERE id = ?',
        [
          user.firstName,
          user.lastName,
          user.email,
          user.phone,
          user.streetAddress,
          user.streetAddress2,
          user.city,
          user.state,
          user.zipCode,
          user.emailVerified,
          user.isAdmin,
          user.id
        ]
      )

      router.push('/admin/users')
    } catch (err: any) {
      console.error(err.message)
    }
  }

  return (
    <Layout>
      <h1>Edit User</h1>
      <Form
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        user={user}
      />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query
  try {
    const results = await queryDatabase(
      'SELECT * FROM sneakers.users WHERE id = ?',
      [id as string]
    )

    return { props: { user: results[0] } }
  } catch (err: any) {
    return { props: { errors: err.message } }
  }
}

export default UserEdit
