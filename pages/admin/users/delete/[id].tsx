import axios from 'axios'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import User from '../../../../interfaces/User'
import { queryDatabase } from '../../../../lib/db'
import TrashIcon from '../../../../modules/common/icons/TrashIcon'

type Props = {
  user: User
  errors?: string
}

const UserDelete = ({user, errors }: Props) => {
  const router = useRouter()

  const handleDelete = async () => {
    try {
      const results = await axios.delete(`/api/users/delete/${router.query.id}`)
      console.log({ results })
      router.push('/admin/users')
    } catch (err: any) {
      console.error(err.message)
    }
  }

  return (
    <div className='p-8 flex flex-col gap-4'>
      <h1>Delete User</h1>
      <p>Are you sure you want to delete this user?</p>
      <p>{user.email}</p>
      <p>{user.firstName} {user.lastName}</p>
      <button type='button' className='p-4 rounded-md bg-red-600 text-gray-100 w-fit flex gap-4' onClick={handleDelete}>
        Delete
        <TrashIcon />
      </button>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const results = (await queryDatabase(
      'SELECT * FROM sneakers.users WHERE id=?',
      [ctx.query.id]
    )) as any[]
    const user = results.map((user) => ({ ...user }))
    console.log({ user })

    return { props: { user: user[0] } }
  } catch (err: any) {
    return { props: { errors: err.message } }
  }
}

export default UserDelete
