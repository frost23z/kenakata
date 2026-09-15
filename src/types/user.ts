type UserRole = 'customer' | 'admin'

type User = {
    id: number
    name: string
    role: UserRole
    email: string
    password: string
    avatar: string
}

type CreateUser = Omit<User, 'id' | 'role'> & {
    role?: UserRole
}

type UpdateUser = Partial<Omit<User, 'id' | 'role'>>
