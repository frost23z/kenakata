import WishlistGrid from '@/components/account/WishlistGrid'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import UMain from '@/components/utilities/UMain'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Your wishlist',
    description: 'Products you saved on this device.',
}

/**
 * Top level rather than /account/wishlist: the wishlist is localStorage, it
 * works signed out, and putting it under /account would send every guest who
 * taps the heart icon in the header to a login form for data that is already
 * on their device.
 */
export default function WishlistPage() {
    return (
        <UMain className='flex flex-col justify-center py-4 lg:py-6'>
            <Breadcrumbs items={[{ label: 'Wishlist' }]} />

            <h1 className='mb-6 text-2xl font-semibold tracking-tight sm:text-3xl'>
                Your wishlist
            </h1>

            <WishlistGrid />
        </UMain>
    )
}
