'use client'

import { useCart } from '@/hooks/useCart'
import { cva } from 'class-variance-authority'
import { cn } from 'cn'
import { Heart } from 'lucide-react'

const wishlistButton = cva(
    'focus-visible:ring-ring flex size-9 items-center justify-center rounded-full backdrop-blur transition-colors focus-visible:ring-2 focus-visible:outline-none',
    {
        variants: {
            saved: {
                true: 'bg-primary/10 text-primary',
                false: 'bg-background/80 text-muted-foreground hover:text-foreground',
            },
        },
        defaultVariants: {
            saved: false,
        },
    }
)

export default function WishlistButton({
    item,
    className = '',
}: {
    item: WishlistItem
    className?: string
}) {
    const { inWishlist, toggleWishlist, ready } = useCart()

    // `ready` is false during the server render and the first client render, so
    // the unsaved state is what hydrates — matching markup on both sides.
    const saved = ready && inWishlist(item.id)

    return (
        <button
            className={cn(wishlistButton({ saved }), className)}
            onClick={() => toggleWishlist(item)}
            disabled={!ready}
            type='button'
            aria-label={saved ? `Remove ${item.title} from wishlist` : `Save ${item.title}`}
            aria-pressed={saved}
        >
            <Heart className={cn('size-4', saved && 'fill-current')} />
        </button>
    )
}
