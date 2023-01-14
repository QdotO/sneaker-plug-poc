type User = {
    id: string
    userName: string
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
    isAdmin: boolean
}

export default User
