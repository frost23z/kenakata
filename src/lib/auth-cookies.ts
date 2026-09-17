export const ACCESS_TOKEN_COOKIE = 'kenakata_access_token'

export const REFRESH_TOKEN_COOKIE = 'kenakata_refresh_token'

export const ACCESS_TOKEN_MAX_AGE = 60 * 60 * 24 * 20

export const REFRESH_TOKEN_MAX_AGE = 60 * 60 * 10

export const SESSION_COOKIE_OPTIONS = {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
} as const
