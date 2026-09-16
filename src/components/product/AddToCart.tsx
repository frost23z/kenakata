'use client'

import Button, { buttonVariants } from '@/components/ui/Button'
import { useCart } from '@/hooks/useCart'
import type { VariantProps } from 'class-variance-authority'
import { Check, ShoppingCart } from 'lucide-react'
import { useEffect, useState } from 'react'

type AddToCartProps = VariantProps<typeof buttonVariants> & {
    item: WishlistItem
    quantity?: number
    className?: string
    label?: string
}

export default function AddToCart({
    item,
    quantity = 1,
    className = '',
    label = 'Add to cart',
    variant = 'primary',
    size = 'md',
}: AddToCartProps) {
    const { add, ready } = useCart()
    const [added, setAdded] = useState(false)

    // The confirmation is transient state, not cart state, so it lives here and
    // clears itself. The cleanup matters: the card can unmount mid-timeout when
    // a filter re-renders the grid.
    useEffect(() => {
        if (!added) return

        const timer = setTimeout(() => setAdded(false), 2000)

        return () => clearTimeout(timer)
    }, [added])

    function handleClick() {
        add(item, quantity)
        setAdded(true)
    }

    return (
        <Button
            className={className}
            onClick={handleClick}
            disabled={!ready}
            type='button'
            variant={added ? 'secondary' : variant}
            size={size}
        >
            {added ? <Check className='size-4' /> : <ShoppingCart className='size-4' />}
            {added ? 'Added' : label}
        </Button>
    )
}
