import React from 'react'
import User from '../../../../interfaces/User'

type Props = {
  currentUser: User
}

const UserCard = ({
  currentUser: {
    firstName,
    lastName,
    streetAddress,
    streetAddress2,
    city,
    state,
    zipCode,
    phone,
    email,
    username,
    emailVerified
  }
}: Props) => {
  return (
    <div className='my-8'>
      <span className='flex justify-start gap-x-4'>
        <p>Name</p>
        <p>{`${firstName} ${lastName}`}</p>
      </span>
      <span className='flex justify-start gap-x-4'>
        <p>Address </p>
        <p>{`${streetAddress}${
          streetAddress2 ? ` - ${streetAddress2}` : ''
        }`}</p>
        <p>{`${city} ${state} ${zipCode}`}</p>
      </span>
      <span className='flex justify-start gap-x-4'>
        <p>Contact Info</p>
        <p>{`${email} - ${phone}`}</p>
        <p>{emailVerified ? 'Email Verified' : 'Email Unverified'}</p>
      </span>
      <span className='flex justify-start gap-x-4 flex-col'>
        <span>
          <p>Credentials</p>
          <p>{`UserName ${username}`}</p>
        </span>
        <button
          type='button'
          className='bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-80'
        >
          Reset Password
        </button>
      </span>
    </div>
  )
}

export default UserCard
