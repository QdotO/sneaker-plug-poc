import { GetServerSideProps } from 'next'
import React, { useState } from 'react'
import Sneaker from '../../interfaces/Sneaker'
import { queryDatabase } from '../../lib/db'
import styled from 'styled-components'
import Event from '../../interfaces/Event'

type Props = {
    sneakers: Sneaker[]
}

const DAY_IN_SECONDS = 86400

const users = [
    {
        id: 1,
        name: 'Teddy',
    },
    {
        id: 2,
        name: 'Bobby',
    },
    {
        id: 3,
        name: 'Keke',
    },
    {
        id: 4,
        name: 'Cedric',
    },
    {
        id: 5,
        name: 'Malcolm',
    },
    {
        id: 6,
        name: 'Martin',
    },
]

const Rental = ({ sneakers }: Props) => {
    const [history, setHistory] = useState<Event[]>([])
    const [currentUser, setCurrentUser] = useState<{
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
                    rate: checkedOutSneaker.rate,
                },
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
                rate: checkoutEvent.rate,
            },
        ])
        let tempCheckedOut = checkedOut.filter((sneaker) => sneaker.id !== id)
        setCheckedOut(tempCheckedOut)
        setCheckedIn([...checkedIn, sneaker])
    }

    return (
        <div>
            <h2>Users</h2>
            {currentUser && <div>Current User: {currentUser?.name}</div>}
            <UsersContainer>
                {users.map((user) => {
                    return (
                        <div key={`user-${user.id}`}>
                            <p>{user.name}</p>
                            <button
                                type='button'
                                onClick={() => setCurrentUser(user)}
                            >
                                Set as Current User
                            </button>
                        </div>
                    )
                })}
            </UsersContainer>
            <br />
            <hr />
            <Container>
                <CheckedInContainer>
                    <h2>Available</h2>
                    {checkedIn.map((sneaker) => {
                        return (
                            <CheckedInSneaker key={sneaker.id}>
                                {sneaker.name}
                                <button
                                    type='button'
                                    onClick={() => onCheckout(sneaker)}
                                >
                                    Check out
                                </button>
                            </CheckedInSneaker>
                        )
                    })}
                </CheckedInContainer>
                <CheckedOutContainer>
                    <h2>Checked Out</h2>
                    {checkedOut.map((sneaker) => {
                        return (
                            <div key={`checkedIn-${sneaker.id}`}>
                                <p>{sneaker.name}</p>
                                <button
                                    type='button'
                                    onClick={() => onCheckIn(sneaker)}
                                >
                                    {' '}
                                    Check In
                                </button>
                            </div>
                        )
                    })}
                </CheckedOutContainer>
            </Container>
            <div>
                <h2>History</h2>
                {history.map(
                    ({
                        id,
                        type,
                        user,
                        timeStamp,
                        sneaker,
                        rate,
                        charge,
                    }: Event) => {
                        return (
                            <HistoryContainer
                                key={`${user.name}-${type}-${sneaker.brand}-${sneaker.name}`}
                            >
                                <p>Event ID: {id}</p>
                                <p>Event Type: {type} </p>
                                <p>User: {user.name}</p>
                                <p>{`${
                                    type === 'checkin'
                                        ? 'Check In'
                                        : 'Check out'
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
                            </HistoryContainer>
                        )
                    }
                )}
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const results = (await queryDatabase(
        'SELECT * FROM sneakers.sneakers'
    )) as []
    const sneakers: Sneaker[] = results.map((result: Sneaker) => {
        return {
            id: result.id,
            name: result.name,
            brand: result.brand,
            rate: result.rate,
            date: result.date,
            image: result.image,
        }
    })

    return {
        props: {
            sneakers,
        },
    }
}

const Container = styled.div`
    display: flex;
    min-width: 100%;
`

const CheckedInSneaker = styled.div`
    width: 400px;
    margin: 1rem 0;
    display: flex;
    justify-content: space-between;
`

const CheckedInContainer = styled.div`
    width: 50%;
    padding: 1rem;
`

const CheckedOutContainer = styled.div`
    width: 50%;
    border: 1px solid lightgrey;
    border-radius: 8px;
    padding: 1rem;
`

const UsersContainer = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: space-evenly;
`

const HistoryContainer = styled.div`
    border: 1px solid lightgrey;
    border-radius: 8px;
    margin: 1rem;
    padding: 1rem;
`

export default Rental
