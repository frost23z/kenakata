'use client'

import { useCart } from '@/hooks/useCart'
import { cartTotals } from '@/lib/cart-total'
import { formatPrice } from '@/lib/format'

type OrderSummaryProps = {
    /** The call to action differs by page: a link on /cart, a submit on /checkout. */
    children?: React.ReactNode
    /** Checkout itemises what it is about to charge for; /cart already shows the lines. */
    showLines?: boolean
}

/**
 * Shared by /cart and /checkout. The demo computed subtotal, delivery and
 * total separately in each one, which is how the two pages end up quoting
 * different totals for the same cart.
 */
export default function OrderSummary({ children, showLines = false }: OrderSummaryProps) {
    const { items, subtotal, ready } = useCart()

    if (!ready) {
        return <aside className='border-border h-56 animate-pulse rounded-xl border' />
    }

    if (items.length === 0) return null

    const { delivery, total, shortfall } = cartTotals(subtotal)

    return (
        <aside className='border-border h-fit rounded-xl border p-5'>
            <h2 className='text-base font-semibold'>Order summary</h2>

            {showLines && (
                <ul className='border-border mt-4 space-y-2 border-b pb-4 text-sm'>
                    {items.map((item) => (
                        <li className='flex justify-between gap-3' key={item.id}>
                            <span className='text-muted-foreground line-clamp-1'>
                                {item.quantity} × {item.title}
                            </span>
                            <span className='shrink-0 tabular-nums'>
                                {formatPrice(item.price * item.quantity)}
                            </span>
                        </li>
                    ))}
                </ul>
            )}

            <dl className='mt-4 space-y-2 text-sm'>
                <div className='flex justify-between'>
                    <dt className='text-muted-foreground'>Subtotal</dt>
                    <dd className='tabular-nums'>{formatPrice(subtotal)}</dd>
                </div>

                <div className='flex justify-between'>
                    <dt className='text-muted-foreground'>Delivery</dt>
                    <dd className='tabular-nums'>
                        {delivery === 0 ? 'Free' : formatPrice(delivery)}
                    </dd>
                </div>

                <div className='border-border flex justify-between border-t pt-3 text-base font-semibold'>
                    <dt>Total</dt>
                    <dd className='tabular-nums'>{formatPrice(total)}</dd>
                </div>
            </dl>

            {shortfall > 0 && (
                <p className='text-muted-foreground mt-3 text-xs'>
                    Add {formatPrice(shortfall)} more for free delivery inside Dhaka.
                </p>
            )}

            {children}
        </aside>
    )
}
