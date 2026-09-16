'use client'

import {
    addItem,
    clearCart,
    getServerSnapshot,
    getSnapshot,
    removeItem,
    setItemQuantity,
    subscribe,
    toggleWishlistItem,
} from '@/lib/cart-store'
import { useSyncExternalStore } from 'react'

/**
 * Read side of the cart store. Derived values (count, subtotal) are computed on
 * every render rather than stored, so there is only ever one source of truth.
 */
export function useCart() {
    const { items, wishlist, ready } = useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerSnapshot
    )

    return {
        items,
        wishlist,
        ready,
        count: items.reduce((total, entry) => total + entry.quantity, 0),
        subtotal: items.reduce((total, entry) => total + entry.price * entry.quantity, 0),
        inWishlist: (id: number) => wishlist.some((entry) => entry.id === id),
        add: addItem,
        setQuantity: setItemQuantity,
        remove: removeItem,
        clear: clearCart,
        toggleWishlist: toggleWishlistItem,
    }
}
