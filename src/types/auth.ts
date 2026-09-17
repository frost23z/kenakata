type LoginCredentials = {
    email: string
    password: string
}

type AuthTokens = {
    access_token: string
    refresh_token: string
}

type RefreshTokenInput = {
    refreshToken: string
}

type AuthState = {
    /** Whole-form failure — bad credentials, API down. */
    error?: string
    /** Per-field messages keyed by input name, rendered in `Field`'s error slot. */
    fieldErrors?: Record<string, string>
}
