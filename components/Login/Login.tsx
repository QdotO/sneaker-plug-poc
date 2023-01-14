import { signIn } from 'next-auth/react'
import React, { useState } from 'react'


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
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='Username'>Username</label>
                <input
                    type='email'
                    title='Username'
                    onChange={({ target: { value } }) =>
                        setUserInfo({ ...userInfo, email: value })
                    }
                />
                <br />
                <label htmlFor='Password'>Password</label>
                <input
                    type='password'
                    title='Password'
                    onChange={({ target: { value } }) =>
                        setUserInfo({ ...userInfo, password: value })
                    }
                />
                <br />
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login
