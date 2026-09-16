import CartLines from '@/components/cart/CartLines'
import OrderSummary from '@/components/cart/OrderSummary'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { ButtonLink } from '@/components/ui/Button'
import UMain from '@/components/utilities/UMain'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Your cart',
    description: 'Review the items in your Kenakata cart before checking out.',
}

export default function CartPage() {
    return (
        <UMain className='flex flex-col justify-center py-4 lg:py-6'>
            <Breadcrumbs items={[{ label: 'Cart' }]} />

            <h1 className='mb-6 text-2xl font-semibold tracking-tight sm:text-3xl'>Your cart</h1>

            <div className='grid items-start gap-8 lg:grid-cols-[2fr_1fr]'>
                <CartLines />

                <OrderSummary>
                    <ButtonLink className='mt-5 w-full' href='/checkout' size='lg'>
                        Proceed to checkout
                    </ButtonLink>
                </OrderSummary>
            </div>
        </UMain>
    )
}
