import React, { ReactNode } from 'react'
import GetStaticProps, { GetServerSideProps, GetStaticPaths } from 'next'
import User from '../../../interfaces/User'
import Layout from '../../../modules/common/components/Layout'
import ListDetail from '../../../modules/common/components/ListDetail'
import { queryDatabase } from '../../../lib/db'

// 9. Create a type for the props that will be passed to the component

type Props = {
  item?: User
  errors?: string
}

const UserDetail = ({ item, errors }: Props) => {
  if (errors) {
    return (
      <Layout>
        <p>
          <span>There was an error retrieving the user:</span>
          <span>{errors}</span>
        </p>
      </Layout>
    )
  }

  return (
    <div>
      <h1>User Detail</h1>
      <ListDetail item={item} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query
  try {
    const results = await queryDatabase(
      'SELECT * FROM sneakers.users WHERE id = ?',
      [id as string]
    )

    return { props: { item: results[0] } }
  } catch (err: any) {
    return { props: { errors: err.message } }
  }
}

export default UserDetail
