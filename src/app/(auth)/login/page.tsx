import { loginAction } from '@/app/(auth)/actions'
import AuthForm from '@/components/account/AuthForm'
import UMain from '@/components/utilities/UMain'
import { safeNext } from '@/lib/schemas/auth'
import { getSession } from '@/lib/session'
import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
    title: 'Sign in',
    description: 'Sign in to your Kenakata account.',
    robots: { index: false },
}

function first(value: string | string[] | undefined) {
    return Array.isArray(value) ? value[0] : value
}

export default async function LoginPage({ searchParams }: PageProps<'/login'>) {
    const query = await searchParams
    const next = safeNext(first(query.next))

    // Already signed in: go where they were headed rather than parking them on
    // a form they do not need.
    if (await getSession()) redirect(next ?? '/account')

    return (
        <UMain className='flex items-center justify-center py-16'>
            <div className='border-border w-full max-w-sm rounded-xl border p-6'>
                <h1 className='text-xl font-semibold tracking-tight'>Sign in</h1>

                <p className='text-muted-foreground mt-1 mb-6 text-sm text-pretty'>
                    Sign in to track orders and check out faster.
                </p>

                <AuthForm action={loginAction} mode='login' next={next ?? undefined} />

                <p className='text-muted-foreground mt-6 text-sm'>
                    New here?{' '}
                    <Link
                        className='text-primary font-medium'
                        href={next ? `/register?next=${encodeURIComponent(next)}` : '/register'}
                    >
                        Create an account
                    </Link>
                </p>

                <p className='text-muted-foreground border-border mt-4 border-t pt-4 text-xs'>
                    Demo account: john@mail.com / changeme
                </p>
            </div>
        </UMain>
    )
}
