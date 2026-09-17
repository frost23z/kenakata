import { getProfile } from '@/lib/api/auth'
import {
    ACCESS_TOKEN_COOKIE,
    ACCESS_TOKEN_MAX_AGE,
    REFRESH_TOKEN_COOKIE,
    REFRESH_TOKEN_MAX_AGE,
    SESSION_COOKIE_OPTIONS,
} from '@/lib/auth-cookies'
import { cookies } from 'next/headers'

/**
 * The signed-in user, or null. Never throws: a layout that cannot read the
 * session should render a signed-out state or redirect, not hand the whole
 * subtree to `error.tsx`.
 *
 * Note what this deliberately does not do: refresh an expired token. Cookies
 * can only be written from a server action or a route handler, so a refresh
 * attempted here would compute a new token and then be unable to store it,
 * refetching on every render. Refresh lives in `middleware.ts` instead, where
 * there is a response to attach cookies to.
 */
export async function getSession(): Promise<User | null> {
    const store = await cookies()
    const token = store.get(ACCESS_TOKEN_COOKIE)?.value

    if (!token) return null

    try {
        return await getProfile(token)
    } catch {
        return null
    }
}

/** Server actions only — writing cookies during a render throws. */
export async function setSessionCookies(tokens: AuthTokens) {
    const store = await cookies()

    store.set(ACCESS_TOKEN_COOKIE, tokens.access_token, {
        ...SESSION_COOKIE_OPTIONS,
        maxAge: ACCESS_TOKEN_MAX_AGE,
    })

    store.set(REFRESH_TOKEN_COOKIE, tokens.refresh_token, {
        ...SESSION_COOKIE_OPTIONS,
        maxAge: REFRESH_TOKEN_MAX_AGE,
    })
}

export async function clearSessionCookies() {
    const store = await cookies()

    store.delete(ACCESS_TOKEN_COOKIE)
    store.delete(REFRESH_TOKEN_COOKIE)
}
