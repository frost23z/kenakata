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
