import { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD } from '@/components/utilities/constants'

type CartTotals = {
    subtotal: number
    delivery: number
    total: number
    /** Amount still needed to reach free delivery. Zero once it is reached. */
    shortfall: number
}

/**
 * One place where delivery is decided. The cart summary, the checkout summary
 * and the stored order all need the same three numbers, and three components
 * each writing `subtotal >= THRESHOLD ? 0 : FEE` is three places to forget the
 * empty-cart case.
 */
export function cartTotals(subtotal: number): CartTotals {
    const qualifies = subtotal >= FREE_DELIVERY_THRESHOLD

    // An empty cart charges nothing: a delivery fee against a ৳0 subtotal
    // reads as a bug, and the demo shows exactly that for a moment.
    const delivery = qualifies || subtotal === 0 ? 0 : DELIVERY_FEE

    return {
        subtotal,
        delivery,
        total: subtotal + delivery,
        shortfall: qualifies ? 0 : FREE_DELIVERY_THRESHOLD - subtotal,
    }
}
