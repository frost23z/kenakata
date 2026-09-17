'use client'

import AddToCart from '@/components/product/AddToCart'
import Button from '@/components/ui/Button'
import StatusPanel from '@/components/ui/StatusPanel'
import UImage from '@/components/utilities/UImage'
import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/lib/format'
import Link from 'next/link'

export default function WishlistGrid() {
    const { wishlist, toggleWishlist, ready } = useCart()

    if (!ready) {
        return <div className='border-border h-48 animate-pulse rounded-xl border' />
    }

    if (wishlist.length === 0) {
        return (
            <StatusPanel
                title='Nothing saved yet'
                body='Tap the heart on any product to keep it here for later.'
                actionLabel='Browse products'
                actionHref='/category'
            />
        )
    }

    return (
        <ul className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {wishlist.map((item) => (
                <li className='border-border flex gap-4 rounded-xl border p-4' key={item.id}>
                    <Link
                        className='bg-muted relative size-20 shrink-0 overflow-hidden rounded-lg'
                        href={`/product/${item.slug}`}
                    >
                        <UImage className='object-cover' src={item.image} alt='' sizes='80px' />
                    </Link>

                    <div className='flex min-w-0 grow flex-col gap-2'>
                        <Link
                            className='hover:text-primary line-clamp-2 text-sm font-medium'
                            href={`/product/${item.slug}`}
                        >
                            {item.title}
                        </Link>

                        <p className='text-sm font-semibold'>{formatPrice(item.price)}</p>

                        <div className='mt-auto flex flex-wrap gap-2'>
                            <AddToCart item={item} size='sm' />
                            <Button onClick={() => toggleWishlist(item)} size='sm' variant='ghost'>
                                Remove
                            </Button>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}
