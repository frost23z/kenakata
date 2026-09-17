'use client'

import { checkEmailAction } from '@/app/(auth)/actions'
import Button from '@/components/ui/Button'
import Field from '@/components/ui/Input'
import { useActionState, useState, useTransition } from 'react'

type AuthFormProps = {
    action: (state: AuthState, formData: FormData) => Promise<AuthState>
    mode: 'login' | 'register'
    /** Where to go after signing in, carried through from `?next=`. */
    next?: string
}

export default function AuthForm({ action, mode, next }: AuthFormProps) {
    const [state, formAction, pending] = useActionState<AuthState, FormData>(action, {})
    const [emailTaken, setEmailTaken] = useState(false)
    const [, startTransition] = useTransition()

    const isRegister = mode === 'register'

    function handleEmailBlur(event: React.FocusEvent<HTMLInputElement>) {
        const email = event.target.value.trim()

        if (!isRegister || !email) return

        startTransition(async () => {
            setEmailTaken(!(await checkEmailAction(email)))
        })
    }

    return (
        <form className='space-y-4' action={formAction}>
            {/* The action cannot read the url, so the redirect target rides along. */}
            {next && <input name='next' type='hidden' value={next} />}

            {isRegister && (
                <Field
                    label='Full name'
                    autoComplete='name'
                    error={state.fieldErrors?.name}
                    name='name'
                    required
                />
            )}

            <Field
                label='Email'
                autoComplete='email'
                error={
                    state.fieldErrors?.email ??
                    (emailTaken ? 'That email already has an account.' : undefined)
                }
                name='email'
                onBlur={handleEmailBlur}
                required
                type='email'
            />

            <Field
                label='Password'
                autoComplete={isRegister ? 'new-password' : 'current-password'}
                error={state.fieldErrors?.password}
                name='password'
                required
                type='password'
            />

            {isRegister && (
                <Field
                    label='Confirm password'
                    autoComplete='new-password'
                    error={state.fieldErrors?.confirmPassword}
                    name='confirmPassword'
                    required
                    type='password'
                />
            )}

            {state.error && (
                <p className='text-destructive text-sm' role='alert'>
                    {state.error}
                </p>
            )}

            <Button className='w-full' disabled={pending} size='lg' type='submit'>
                {pending ? 'Just a moment…' : isRegister ? 'Create account' : 'Sign in'}
            </Button>
        </form>
    )
}
