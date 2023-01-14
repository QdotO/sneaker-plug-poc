import { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import User from '../../../interfaces/User'
import { queryDatabase } from '../../../lib/db'

const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {},
            async authorize(credentials, req) {
                const { email, password } = credentials as {
                    email: string
                    password: string
                }
                const query = `SELECT * FROM sneakers.users WHERE email=?`
                const values = [email]
                let results = await queryDatabase(query, values)
                if (results[0]) {
                    let user: User = results[0]
                    const match = await bcrypt.compare(password, user.password)
                    if (match) {
                        return {
                            id: user.id,
                            name: user.firstName,
                            email,
                        }
                    }
                }
                return null
            },
        }),
    ],
    pages: {
        signIn: '/auth/signin',
    },
}

export default NextAuth(authOptions)
