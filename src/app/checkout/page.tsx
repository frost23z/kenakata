import CheckoutForm from '@/components/cart/CheckoutForm'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import UMain from '@/components/utilities/UMain'
import { getSession } from '@/lib/session'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Checkout',
    robots: { index: false },
}

export default async function CheckoutPage() {
    const user = await getSession()

    return (
        <UMain className='flex flex-col justify-center py-4 lg:py-6'>
            <Breadcrumbs items={[{ label: 'Cart', href: '/cart' }, { label: 'Checkout' }]} />

            <h1 className='mb-6 text-2xl font-semibold tracking-tight sm:text-3xl'>Checkout</h1>

            <CheckoutForm defaultEmail={user?.email ?? ''} defaultName={user?.name ?? ''} />
        </UMain>
    )
}
