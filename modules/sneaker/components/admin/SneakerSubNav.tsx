import Link from 'next/link'
import React from 'react'
import Sneaker from '../../../../interfaces/Sneaker'

type Props = {
  currentSneaker?: Sneaker
}

const SneakerSubNav = ({ currentSneaker }: Props) => {
  return (
    <div className='grid grid-cols-2 grid-rows-2 lg:grid-col gap-4 max-w-sm my-4 mx-auto'>
      <Link
        href='/admin/sneakers/add'
        className='bg-gray-300 text-orange-400 rounded-lg p-4 text-lg shadow-md'
      >
        Add Sneaker
      </Link>
      <Link
        href='admin/sneakers/create'
        className='bg-gray-300 text-orange-400 rounded-lg p-4 text-lg shadow-md'
      >
        Create Sneaker
      </Link>
      {currentSneaker && (
        <>
          <Link
            href='admin/sneakers/edit'
            className='bg-orange-400 rounded-lg text-white p-4 text-lg'
          >
            Edit Current Sneaker
          </Link>
          <Link
            href='admin/sneakers/edit'
            className='bg-orange-400 rounded-lg text-white p-4 text-lg'
          >
            Delete Current Sneaker
          </Link>
        </>
      )}
    </div>
  )
}

export default SneakerSubNav
