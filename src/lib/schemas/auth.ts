import { z } from 'zod'

const email = z.string().trim().email({ message: 'Enter a valid email address.' })

// Four characters is the API's own floor; the demo account's password is
// `changeme`. Asking for more here would lock people out of the demo account.
const password = z.string().min(4, { message: 'Passwords are at least four characters.' })

export const loginSchema = z.object({
    email,
    password,
})

export const registerSchema = z
    .object({
        name: z.string().trim().min(3, { message: 'Enter your full name.' }),
        email,
        password,
        confirmPassword: z.string(),
    })
    .refine((values) => values.password === values.confirmPassword, {
        message: 'Both passwords need to match.',
        path: ['confirmPassword'],
    })

/**
 * `?next=` comes from the url, so it is attacker-controlled: without this an
 * email linking to `/login?next=https://evil.example` turns our own login page
 * into an open redirect. Same-origin absolute paths only, and `//host` is
 * rejected because the browser reads it as protocol-relative.
 */
export function safeNext(value: FormDataEntryValue | string | null | undefined) {
    const path = typeof value === 'string' ? value : ''

    return path.startsWith('/') && !path.startsWith('//') ? path : null
}

/** Flatten zod issues to one message per field, first issue wins. */
export function toFieldErrors(error: z.ZodError): Record<string, string> {
    const fieldErrors: Record<string, string> = {}

    for (const issue of error.issues) {
        const key = String(issue.path[0] ?? '')
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message
    }

    return fieldErrors
}
