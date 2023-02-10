import axios from 'axios'
import { useRouter } from 'next/router'
import { queryDatabase } from '../../../../lib/db'

type Props = {
  errors?: string
}

const SneakerDelete = ({ errors }: Props) => {
  const router = useRouter()
  const { id } = router.query

  const handleSubmit = (event) => {
    event.preventDefault()
    const result = axios.post(`/api/sneakers/delete/${id}`)
    console.log({ DeleteSneakerResult: result })
    router.push(`/sneakers/view/${id}`)
  }

  return (
    <div>
      <h1>Delete Sneaker</h1>
      <button onClick={handleSubmit}>
        Delete
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            path='M4 6h16M4 10h16M4 14h16M4 18h16M9 6V4a2 2 0 012-2h2a2 2 0 012 2v2M9 18h.01M15 18h.01'
          />
        </svg>
      </button>
    </div>
  )
}

export default SneakerDelete
