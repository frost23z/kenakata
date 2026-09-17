import { logoutAction } from '@/app/(auth)/actions'
import Button from '@/components/ui/Button'
import { getSession } from '@/lib/session'
import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
    title: 'Your account',
    robots: { index: false },
}

export default async function AccountPage() {
    const user = await getSession()

    // The layout has already redirected if this is null; the check is here to
    // narrow the type, not to handle a case that can reach this point.
    if (!user) return null

    return (
        <div className='max-w-lg space-y-6'>
            <div className='border-border flex items-center gap-4 rounded-xl border p-5'>
                <Image
                    className='bg-muted size-16 rounded-full object-cover'
                    src={user.avatar}
                    alt=''
                    width={64}
                    height={64}
                />

                <div className='min-w-0'>
                    <p className='truncate font-medium'>{user.name}</p>
                    <p className='text-muted-foreground truncate text-sm'>{user.email}</p>
                    <p className='text-muted-foreground text-xs capitalize'>{user.role}</p>
                </div>
            </div>

            {/* A plain form posting to a server action: signing out works with
                JavaScript disabled, and the action clears httpOnly cookies the
                client could not touch anyway. */}
            <form action={logoutAction}>
                <Button type='submit' variant='outline'>
                    Sign out
                </Button>
            </form>
        </div>
    )
}
