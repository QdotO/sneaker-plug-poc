import { GetServerSideProps } from 'next'
import { useState } from 'react'
import Layout from '../modules/common/components/Layout'
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
    <Layout title='Home | The Snkr Plug'>
      <div>
        <h1>The Snkr Plug</h1>
        <div className='flex md:flex-col'>
          <ul className='flex flex-wrap w-full lg:w-5/6 md:w-auto gap-8'>
            {sneakers.map((sneaker) => (
              <li
                key={sneaker.id}
                onClick={() => router.push(`/sneakers/view/${sneaker.id}`)}
              >
                <div className='shadow-lg rounded-lg flex flex-col gap-4 items-start border border-gray-700'>
                  <img
                    style={{
                      maxWidth: '400px'
                    }}
                    src={`/api/sneakers/images/${sneaker.image}`}
                    alt={sneaker.name}
                  />
                  <h2>{sneaker.name}</h2>
                  <p>{sneaker.brand}</p>
                  <p>${sneaker.rate} per day</p>
                  <button onClick={() => addToCart(sneaker)}>
                    Add to cart
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className='w-full lg:w-1/6'>
            <h2>Cart</h2>
            <ul>
              {cart.map((sneaker) => (
                <li key={sneaker.id}>
                  <h3>{sneaker.name}</h3>
                </li>
              ))}
            </ul>
          </div>
        </div>
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
      image: result.image
    }
  })

  return {
    props: {
      sneakers
    }
  }
}

export default Home
