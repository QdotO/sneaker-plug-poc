type User = {
  id: string
  username: string
  password?: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  streetAddress?: string
  streetAddress2?: string
  city?: string
  state?: string
  zipCode?: string
  emailVerified?: 0 | 1
  isAdmin: 0 | 1
  deletedAt?: string
}

export default User
