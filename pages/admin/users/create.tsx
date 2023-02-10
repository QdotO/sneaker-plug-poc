import { useRouter } from 'next/router'
import React from 'react'
import CreateAccount from '../../../modules/account/components/CreateAccount'

type Props = {}

function create({}: Props) {
  const router = useRouter()
  const onSuccess = () => {
    router.push('/admin/users')
  }
  return <CreateAccount onSuccess={onSuccess} />
}

export default create
