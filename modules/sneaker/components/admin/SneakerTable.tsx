import React from 'react'
import Sneaker from '../../../../interfaces/Sneaker'

type Props = {
  sneakers: Sneaker[]
  setCurrentSneaker: (sneaker: Sneaker) => void
}

const SneakerTable = ({ sneakers, setCurrentSneaker }: Props) => {
  return (
    <>
      <table className='table-auto w-full mx-auto'>
        <thead>
          <tr className=''>
            <th className='px-4 py-2 text-start'>Name</th>
            <th className='px-4 py-2 text-start'>Brand</th>
            <th className='px-4 py-2 text-start'>Colorway</th>
            <th className='px-4 py-2 text-start'>Category</th>
            <th className='px-4 py-2 text-start'>Rental Rate</th>
          </tr>
        </thead>
        <tbody>
          {sneakers.map((sneaker) => (
            <tr
              key={sneaker.id}
              onClick={() => setCurrentSneaker(sneaker)}
              className='cursor-pointer'
            >
              <td className='border px-4 py-2'>{sneaker.name}</td>
              <td className='border px-4 py-2'>{sneaker.brand}</td>
              <td className='border px-4 py-2'>{sneaker.color}</td>
              <td className='border px-4 py-2'>{sneaker.category}</td>
              <td className='border px-4 py-2'>{sneaker.rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default SneakerTable
