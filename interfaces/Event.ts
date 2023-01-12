import Sneaker from './Sneaker'

type Event = {
    id: string
    user: {
        id: number
        name: string
    }
    sneaker: Sneaker
    rate?: number
    timeStamp: number
    type: 'checkout' | 'checkin'
    charge?: number
}

export default Event

// TODO:  will need a way to tracker when a sneaker is shipped for return
// vs when a sneaker is physically receieved and checked in
