import { signIn } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'
import styles from '../../styles/Login.module.css'

type Props = {}

const Login = (props: Props) => {
  const [userInfo, setUserInfo] = useState({ email: '', password: '' })
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault()
    let response = await signIn('credentials', {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    })

    console.log({ SignInResponse: response })
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>Sneaker Plug</h2>
      </div>
      <div className={styles.LoginContainer}>
        <h3>Login</h3>
        <p>
          Don't have an account?{' '}
          <Link href={'/users/create'}>Create an account</Link>
        </p>
        <form className={styles.FormContainer} onSubmit={handleSubmit}>
          <label htmlFor='Username'>Username</label>
          <input
            type='email'
            title='Username'
            required
            onChange={({ target: { value } }) =>
              setUserInfo({ ...userInfo, email: value })
            }
          />
          <br />
          <label htmlFor='Password'>Password</label>
          <input
            type='password'
            title='Password'
            required
            onChange={({ target: { value } }) =>
              setUserInfo({ ...userInfo, password: value })
            }
          />
          <br />
          <div className={styles.remember}>
            <div>
              <label htmlFor='remember'>Remember me?</label>
              <input type='checkbox' name='remember' id='remember' />
            </div>
            <Link href='/users/forgot'>Forgot Password?</Link>
          </div>
          <button className={styles.LoginButton} type='submit'>
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
