import Image from 'next/image'
import React from 'react'
import Sneaker from '../../../../interfaces/Sneaker'

type Props = {
  sneaker: Sneaker
}

const SneakerCard = ({
  sneaker: { name, brand, color, category, rate, date, image }
}: Props) => {
  return (
    <>
      <div className='flex flex-col items-center'>
        <h2 className='text-2xl font-bold'>Current Sneaker</h2>
        <div className='bg-gray-400 border border-gray-800 rounded-md flex'>
          <Image
            src={`/api/sneakers/images/${image}`}
            width={300}
            height={300}
            alt={name}
          />
          <div className='p-4'>
            <p className='text-lg'>
              <span className='font-bold'>Name:</span> {name}
            </p>
            <p className='text-lg'>
              <span className='font-bold'>Brand:</span> {brand}
            </p>
            <p className='text-lg'>
              <span className='font-bold'>Colorway:</span> {color}
            </p>
            <p className='text-lg'>
              <span className='font-bold'>Category:</span> {category}
            </p>
            <p className='text-lg'>
              <span className='font-bold'>Rental Rate:</span> {rate}
            </p>
            <p className='text-lg'>
              <span className='font-bold'>Date Added:</span> {date}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default SneakerCard
