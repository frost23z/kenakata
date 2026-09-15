'use client'

import { buttonVariants } from '@/components/ui/Button'
import Field from '@/components/ui/Input'
import { cn } from 'cn'
import { useState } from 'react'

export default function NewsletterForm() {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<'idle' | 'done'>('idle')

    function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault()
        if (!email.trim()) return
        // No newsletter endpoint on the Platzi API — this is deliberately fake.
        setStatus('done')
        setEmail('')
    }

    return (
        <div className='max-w-sm'>
            <h2 className='text-base font-semibold'>Deals in your inbox</h2>
            <p className='text-muted-foreground mt-1 text-sm'>
                One email a week with price drops and new arrivals. Unsubscribe anytime.
            </p>

            <form className='mt-3 flex items-end gap-2' onSubmit={handleSubmit} noValidate>
                <Field
                    wrapperClassName='grow'
                    label='Email address'
                    type='email'
                    value={email}
                    onChange={(event) => {
                        setEmail(event.target.value)
                        setStatus('idle')
                    }}
                    placeholder='you@example.com'
                    autoComplete='email'
                    required
                />
                <button className={cn(buttonVariants(), 'shrink-0')} type='submit'>
                    Subscribe
                </button>
            </form>

            <p className='text-muted-foreground mt-2 h-4 text-xs' aria-live='polite'>
                {status === 'done' && 'Subscribed. Check your inbox to confirm.'}
            </p>
        </div>
    )
}
