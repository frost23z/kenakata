import { jsonBody, request } from '@/lib/api/client'

export async function login(credentials: LoginCredentials): Promise<AuthTokens> {
    try {
        return await request<AuthTokens>('/auth/login', {
            method: 'POST',
            revalidate: false,
            ...jsonBody(credentials),
        })
    } catch {
        throw new Error('Invalid email or password')
    }
}

export async function getProfile(accessToken: string): Promise<User> {
    return request<User>('/auth/profile', {
        revalidate: false,
        headers: { Authorization: `Bearer ${accessToken}` },
    })
}

export async function refreshToken(token: string): Promise<AuthTokens> {
    return request<AuthTokens>('/auth/refresh-token', {
        method: 'POST',
        revalidate: false,
        ...jsonBody({ refreshToken: token } satisfies RefreshTokenInput),
    })
}
