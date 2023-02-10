import { GetServerSideProps } from 'next'
import React, { useState } from 'react'
import Sneaker from '../../../interfaces/Sneaker'
import { queryDatabase } from '../../../lib/db'
import Event from '../../../interfaces/Event'

type Props = {
  sneakers: Sneaker[]
}

const DAY_IN_SECONDS = 86400

const users = [
  {
    id: 1,
    name: 'Teddy'
  },
  {
    id: 2,
    name: 'Bobby'
  },
  {
    id: 3,
    name: 'Keke'
  },
  {
    id: 4,
    name: 'Cedric'
  },
  {
    id: 5,
    name: 'Malcolm'
  },
  {
    id: 6,
    name: 'Martin'
  }
]

const Rental = ({ sneakers }: Props) => {
  const [history, setHistory] = useState<Event[]>([])
  const [currentUser, setCurrentUser] =
    useState<{
      id: number
      name: string
    }>()
  const [checkedIn, setCheckedIn] = useState(sneakers)
  const [checkedOut, setCheckedOut] = useState([])
  const onCheckout = (sneaker) => {
    if (currentUser) {
      let idx = checkedIn.indexOf(sneaker)
      let checkedOutSneaker = checkedIn[idx]
      let tempCheckout = checkedOut
      let tempCheckIn = checkedIn.filter(
        (sneaker) => sneaker.id !== checkedOutSneaker.id
      )
      tempCheckout.push(checkedOutSneaker)
      setCheckedIn(tempCheckIn)
      setCheckedOut(tempCheckout)
      setHistory([
        ...history,
        {
          id: crypto.randomUUID(),
          user: currentUser,
          sneaker: checkedOutSneaker,
          timeStamp: Date.now(),
          type: 'checkout',
          rate: checkedOutSneaker.rate
        }
      ])
    } else {
      alert('Select a user before trying to checkout a sneaker')
    }
  }

  const onCheckIn = (sneaker) => {
    const { id } = sneaker
    let sneakerEvents = history.filter(
      (ev) => ev.sneaker.id === id && ev.type === 'checkout'
    )
    let checkoutEvent = sneakerEvents[sneakerEvents.length - 1]
    let duration = Date.now() / 1000 - checkoutEvent.timeStamp / 1000
    duration =
      duration < DAY_IN_SECONDS
        ? DAY_IN_SECONDS / DAY_IN_SECONDS
        : duration / DAY_IN_SECONDS
    let charge = duration * checkoutEvent.rate
    console.log({ charge, duration, checkoutEvent })

    setHistory([
      ...history,
      {
        id: crypto.randomUUID(),
        type: 'checkin',
        sneaker,
        timeStamp: Date.now(),
        user: checkoutEvent.user,
        charge,
        rate: checkoutEvent.rate
      }
    ])
    let tempCheckedOut = checkedOut.filter((sneaker) => sneaker.id !== id)
    setCheckedOut(tempCheckedOut)
    setCheckedIn([...checkedIn, sneaker])
  }

  return (
    <div>
      <h2>Users</h2>
      {currentUser && <div>Current User: {currentUser?.name}</div>}
      <div className='flex gap-4 justify-evenly'>
        {users.map((user) => {
          return (
            <div key={`user-${user.id}`}>
              <p>{user.name}</p>
              <button type='button' onClick={() => setCurrentUser(user)}>
                Set as Current User
              </button>
            </div>
          )
        })}
      </div>
      <br />
      <hr />
      <div className='border border-gray-100 rounded-lg m-4 p-4'>
        <div className='w-1/2 p-4'>
          <h2>Available</h2>
          {checkedIn.map((sneaker) => {
            return (
              <div className='w-96 m-4 flex justify-between' key={sneaker.id}>
                {sneaker.name}
                <button type='button' onClick={() => onCheckout(sneaker)}>
                  Check out
                </button>
              </div>
            )
          })}
        </div>
        <div className='w-1/2 border border-gray-200 rounded-lg p-4'>
          <h2>Checked Out</h2>
          {checkedOut.map((sneaker) => {
            return (
              <div key={`checkedIn-${sneaker.id}`}>
                <p>{sneaker.name}</p>
                <button type='button' onClick={() => onCheckIn(sneaker)}>
                  {' '}
                  Check In
                </button>
              </div>
            )
          })}
        </div>
      </div>
      <div>
        <h2>History</h2>
        {history.map(
          ({ id, type, user, timeStamp, sneaker, rate, charge }: Event) => {
            return (
              <div
                key={`${user.name}-${type}-${sneaker.brand}-${sneaker.name}`}
              >
                <p>Event ID: {id}</p>
                <p>Event Type: {type} </p>
                <p>User: {user.name}</p>
                <p>{`${
                  type === 'checkin' ? 'Check In' : 'Check out'
                } ${`timestamp: `}${new Date(
                  timeStamp
                ).toLocaleDateString()} - ${new Date(
                  timeStamp
                ).toTimeString()}`}</p>
                <p>
                  Sneaker: {sneaker.brand} - {sneaker.name}
                </p>
                {rate && <p>Rental Rate: ${rate}</p>}
                {charge && <p>Total: ${charge}</p>}
              </div>
            )
          }
        )}
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const results = (await queryDatabase('SELECT * FROM sneakers.sneakers')) as []
  const sneakers: Sneaker[] = results.map((result: Sneaker) => {
    return {
      id: result.id,
      name: result.name,
      brand: result.brand,
      rate: result.rate,
      date: result.date,
      image: result.image
    }
  })

  return {
    props: {
      sneakers
    }
  }
}

export default Rental
