import { registerAction } from '@/app/(auth)/actions'
import AuthForm from '@/components/account/AuthForm'
import UMain from '@/components/utilities/UMain'
import { safeNext } from '@/lib/schemas/auth'
import { getSession } from '@/lib/session'
import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
    title: 'Create an account',
    description: 'Create a Kenakata account.',
    robots: { index: false },
}

function first(value: string | string[] | undefined) {
    return Array.isArray(value) ? value[0] : value
}

export default async function RegisterPage({ searchParams }: PageProps<'/register'>) {
    const query = await searchParams
    const next = safeNext(first(query.next))

    if (await getSession()) redirect(next ?? '/account')

    return (
        <UMain className='flex items-center justify-center py-16'>
            <div className='border-border w-full max-w-sm rounded-xl border p-6'>
                <h1 className='text-xl font-semibold tracking-tight'>Create an account</h1>

                <p className='text-muted-foreground mt-1 mb-6 text-sm text-pretty'>
                    It takes a minute and makes the next checkout faster.
                </p>

                <AuthForm action={registerAction} mode='register' next={next ?? undefined} />

                <p className='text-muted-foreground mt-6 text-sm'>
                    Already have one?{' '}
                    <Link
                        className='text-primary font-medium'
                        href={next ? `/login?next=${encodeURIComponent(next)}` : '/login'}
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </UMain>
    )
}
