import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import Sneaker from '../../../interfaces/Sneaker'
import { queryDatabase } from '../../../lib/db'
import SneakerCard from '../../../modules/sneaker/components/admin/SneakerCard'
import SneakerSubNav from '../../../modules/sneaker/components/admin/SneakerSubNav'
import SneakerTable from '../../../modules/sneaker/components/admin/SneakerTable'

type Props = {
  sneakers: Sneaker[]
}

const index = ({ sneakers }: Props) => {
  const [currentSneaker, setCurrentSneaker] = useState<Sneaker>(null)
  return (
    <div className='flex flex-col p-4'>
      <h1 className='text-4xl font-bold text-start'>Sneakers</h1>
      {currentSneaker && <SneakerCard sneaker={currentSneaker} />}
      <h2 className='text-2xl font-bold'>Sneaker Management</h2>
      <SneakerSubNav currentSneaker={currentSneaker} />
      <SneakerTable sneakers={sneakers} setCurrentSneaker={setCurrentSneaker} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const results = (await queryDatabase(
    `SELECT * FROM sneakers.sneakers `
  )) as any[]
  if (results) {
    const sneakers: Sneaker[] = results.map((sneaker) => {
      const formattedDate = new Date(Number.parseInt(sneaker.date))
        .toISOString()
        .split('T')[0]
      sneaker.date = formattedDate
      return { ...sneaker }
    })

    return {
      props: {
        sneakers
      }
    }
  }
}
export default index
