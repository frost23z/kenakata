import { jsonBody, request } from '@/lib/api/client'

export async function getUsers(): Promise<User[]> {
    return request<User[]>('/users', { revalidate: false })
}

export async function getUserById(id: number): Promise<User> {
    return request<User>(`/users/${id}`, { revalidate: false })
}

export async function createUser(user: CreateUser): Promise<User> {
    return request<User>('/users', {
        method: 'POST',
        revalidate: false,
        ...jsonBody(user),
    })
}

export async function updateUser(id: number, user: UpdateUser): Promise<User> {
    return request<User>(`/users/${id}`, {
        method: 'PUT',
        revalidate: false,
        ...jsonBody(user),
    })
}

export async function checkEmailAvailability(email: string): Promise<boolean> {
    const data = await request<{ isAvailable: boolean }>('/users/is-available', {
        method: 'POST',
        revalidate: false,
        ...jsonBody({ email }),
    })

    return data.isAvailable
}
