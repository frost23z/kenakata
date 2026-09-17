import Breadcrumbs from '@/components/ui/Breadcrumbs'
import UMain from '@/components/utilities/UMain'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'

const ACCOUNT_NAV: readonly NavLink[] = [
    // Exact, or the overview link stays lit on every page in the section.
    { label: 'Overview', href: '/account', exact: true },
    { label: 'Orders', href: '/account/orders' },
    { label: 'Addresses', href: '/account/addresses' },
    // Deliberately outside /account: the wishlist is localStorage, so it works
    // signed out and does not belong behind the middleware.
    { label: 'Wishlist', href: '/wishlist' },
]

export default async function AccountLayout({ children }: LayoutProps<'/account'>) {
    const user = await getSession()

    // The middleware already bounces anonymous requests. This is the second
    // lock: the matcher is a string pattern and a new nested route that slips
    // past it should still not render somebody's account.
    if (!user) redirect('/login?next=/account')

    return (
        <UMain className='pb-16'>
            <Breadcrumbs items={[{ label: 'Account' }]} />

            <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
                Hello, {user.name.split(' ')[0]}
            </h1>

            <div className='mt-8 grid gap-8 lg:grid-cols-[12rem_1fr]'>
                <div>{children}</div>
            </div>
        </UMain>
    )
}
