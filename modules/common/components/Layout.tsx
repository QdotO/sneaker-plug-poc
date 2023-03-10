import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { signIn } from 'next-auth/react'

type Props = {
  children?: ReactNode
  title?: string
}

const handleLogin: React.MouseEventHandler<HTMLButtonElement> = (e) => {
  signIn()
}

const Layout = ({ children, title = 'Sneaker Plug' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link href='/dist/output.css' rel='stylesheet'></link>
    </Head>
    <header className='flex justify-between'>
      <h2 className='text-lg'>{title}</h2>
      <nav className='flex justify-evenly'>
        <Link href='/'>Home</Link> | <Link href='/about'>About</Link> |{' '}
        <Link href='/users'>Users List</Link> |{' '}
        <Link href='/sneakers/add'>Add Sneaker</Link> |{' '}
        <a href='/api/users'>Users API</a>
        <button type='button' onClick={handleLogin}>
          Login
        </button>
      </nav>
    </header>
    {children}
    <footer>
      <hr />
      <span>I'm here to stay (Footer)</span>
    </footer>
  </div>
)

export default Layout
