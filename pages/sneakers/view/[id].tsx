import { GetServerSideProps } from 'next'
import React from 'react'
import Layout from '../../../modules/common/components/Layout'
import SneakerDisplay from '../../../modules/sneaker/components/Sneaker/SneakerDisplay'
import Sneaker from '../../../interfaces/Sneaker'
import { queryDatabase } from '../../../lib/db'

type Props = {
  sneaker: Sneaker
}

const SneakerPage = ({ sneaker }: Props) => {
  return (
    <Layout>
      <SneakerDisplay sneaker={sneaker} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id as string
  if (id) {
    const results = (await queryDatabase(
      `SELECT * FROM sneakers.sneakers WHERE id='${id}'`
    )) as any[]
    if (results) {
      const sneaker: Sneaker = { ...results[0] }
      const formattedDate = new Date(Number.parseInt(sneaker.date))
        .toISOString()
        .split('T')[0]
      sneaker.date = formattedDate

      return {
        props: {
          sneaker,
        },
      }
    }
  }
}

export default SneakerPage
