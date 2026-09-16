'use client'

import { useCart } from '@/hooks/useCart'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'

export default function CartButton() {
    const { count, ready } = useCart()

    return (
        <Link
            className='hover:bg-accent hover:text-accent-foreground relative flex size-10 items-center justify-center rounded-md transition-colors'
            href='/cart'
            aria-label={count > 0 ? `Cart, ${count} items` : 'Cart, empty'}
        >
            <ShoppingCart />
            {ready && count > 0 && (
                <span className='bg-primary text-primary-foreground absolute end-1 top-1 flex min-w-4 justify-center rounded-full px-1 text-[10px] leading-4 font-semibold'>
                    {count > 99 ? '99+' : count}
                </span>
            )}
        </Link>
    )
}
