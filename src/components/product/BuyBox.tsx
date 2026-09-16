'use client'

import QuantityStepper from '@/components/product/QuantityStepper'
import Button, { ButtonLink } from '@/components/ui/Button'
import { useCart } from '@/hooks/useCart'
import { cn } from 'cn'
import { Heart } from 'lucide-react'
import { useState } from 'react'

export default function BuyBox({ item }: { item: WishlistItem }) {
    const { add, toggleWishlist, inWishlist, ready } = useCart()
    const [quantity, setQuantity] = useState(1)

    const saved = ready && inWishlist(item.id)

    return (
        <div className='space-y-4'>
            <div className='flex flex-wrap items-center gap-3'>
                <QuantityStepper value={quantity} onChange={setQuantity} />

                <Button
                    className='grow sm:grow-0'
                    onClick={() => add(item, quantity)}
                    disabled={!ready}
                    type='button'
                    size='lg'
                >
                    Add to cart
                </Button>

                <ButtonLink
                    className='grow sm:grow-0'
                    href='/checkout'
                    onClick={() => add(item, quantity)}
                    variant='secondary'
                    size='lg'
                >
                    Buy now
                </ButtonLink>
            </div>

            <button
                className='text-muted-foreground hover:text-primary flex items-center gap-2 text-sm'
                onClick={() => toggleWishlist(item)}
                disabled={!ready}
                type='button'
                aria-pressed={saved}
            >
                <Heart className={cn('size-4', saved && 'text-primary fill-current')} />
                {saved ? 'Saved to wishlist' : 'Save for later'}
            </button>
        </div>
    )
}
