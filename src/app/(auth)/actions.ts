'use server'

import { login } from '@/lib/api/auth'
import { checkEmailAvailability, createUser } from '@/lib/api/users'
import { loginSchema, registerSchema, safeNext, toFieldErrors } from '@/lib/schemas/auth'
import { clearSessionCookies, setSessionCookies } from '@/lib/session'
import { redirect } from 'next/navigation'

export async function loginAction(_state: AuthState, formData: FormData): Promise<AuthState> {
    const parsed = loginSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })

    if (!parsed.success) {
        return { fieldErrors: toFieldErrors(parsed.error) }
    }

    try {
        await setSessionCookies(await login(parsed.data))
    } catch {
        return { error: 'That email and password combination did not work.' }
    }

    redirect(safeNext(formData.get('next')) ?? '/account')
}

export async function registerAction(_state: AuthState, formData: FormData): Promise<AuthState> {
    const parsed = registerSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
    })

    if (!parsed.success) {
        return { fieldErrors: toFieldErrors(parsed.error) }
    }

    const { name, email, password } = parsed.data

    try {
        // Checked before creating rather than reading it out of the failure:
        // the API returns the same 400 for a taken email and a malformed
        // payload, and "that email is already registered" is the one message
        // worth putting on the field itself.
        if (!(await checkEmailAvailability(email))) {
            return { fieldErrors: { email: 'That email already has an account.' } }
        }

        await createUser({
            name,
            email,
            password,
            avatar: `https://i.pravatar.cc/150?u=${encodeURIComponent(email)}`,
        })

        await setSessionCookies(await login({ email, password }))
    } catch {
        return { error: 'That account could not be created. Try again in a moment.' }
    }

    redirect(safeNext(formData.get('next')) ?? '/account')
}

export async function logoutAction() {
    await clearSessionCookies()

    redirect('/')
}

/** Called on blur from the register form. Failure reads as available — the API is the real gate. */
export async function checkEmailAction(email: string): Promise<boolean> {
    if (!email.includes('@')) return true

    try {
        return await checkEmailAvailability(email.trim())
    } catch {
        return true
    }
}
