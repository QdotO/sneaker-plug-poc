import { GetServerSideProps } from 'next'
import { useState } from 'react'
import Layout from '../components/Layout'
import { queryDatabase } from '../lib/db'
import Sneaker from '../interfaces/Sneaker'
import { useRouter } from 'next/router'

type Props = {
  sneakers: Sneaker[]
}

const Home = ({ sneakers }: Props) => {
  const [cart, setCart] = useState<Sneaker[]>([])

  const addToCart = (sneaker: Sneaker) => {
    setCart([...cart, sneaker])
  }

  const router = useRouter()

  return (
    <Layout title='Home | Sneaker Plug'>
      <div>
        <h1>Sneaker Plug</h1>
        <ul>
          {sneakers.map((sneaker) => (
            <li
              key={sneaker.id}
              onClick={() => router.push(`/sneakers/view/${sneaker.id}`)}
            >
              <img
                style={{
                  maxWidth: '400px',
                }}
                src={`/api/sneakers/images/${sneaker.image}`}
                alt={sneaker.name}
              />
              <h2>{sneaker.name}</h2>
              <p>{sneaker.brand}</p>
              <p>${sneaker.rate} per day</p>
              <button onClick={() => addToCart(sneaker)}>Add to cart</button>
            </li>
          ))}
        </ul>
        <h2>Cart</h2>
        <ul>
          {cart.map((sneaker) => (
            <li key={sneaker.id}>
              <h3>{sneaker.name}</h3>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
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
      image: result.image,
    }
  })

  return {
    props: {
      sneakers,
    },
  }
}

export default Home
