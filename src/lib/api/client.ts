import { API, REVALIDATE } from '@/lib/env'

export class ApiError extends Error {
    status: number

    constructor(message: string, status: number) {
        super(message)
        this.name = 'ApiError'
        this.status = status
    }
}

type RequestOptions = Omit<RequestInit, 'cache'> & {
    /**
     * Seconds to cache the response for, or `false` for per-user data that must
     * never be shared between requests (auth, profile, admin writes).
     */
    revalidate?: number | false
}

/**
 * Every call to the Platzi API goes through here. Centralising it keeps the
 * caching policy in one place: catalogue reads opt into timed revalidation,
 * anything user-specific opts out entirely.
 */
export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const { revalidate, ...init } = options

    const response = await fetch(`${API}${path}`, {
        ...init,
        ...(revalidate === false
            ? { cache: 'no-store' as const }
            : { next: { revalidate: revalidate ?? REVALIDATE } }),
    })

    if (!response.ok) {
        throw new ApiError(`Request to ${path} failed with ${response.status}`, response.status)
    }

    return (await response.json()) as T
}

/** POST/PUT bodies are always json in this API. */
export function jsonBody(payload: unknown) {
    return {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    }
}
