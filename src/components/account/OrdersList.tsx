'use client'

import { ButtonLink } from '@/components/ui/Button'
import StatusPanel from '@/components/ui/StatusPanel'
import { formatDate, formatPrice } from '@/lib/format'
import { getOrdersSnapshot, getServerOrdersSnapshot, subscribeOrders } from '@/lib/orders'
import { paymentLabel } from '@/lib/schemas/checkout'
import { useSyncExternalStore } from 'react'

export default function OrdersList() {
    const orders = useSyncExternalStore(subscribeOrders, getOrdersSnapshot, getServerOrdersSnapshot)

    if (orders === null) {
        return <div className='border-border h-40 animate-pulse rounded-xl border' />
    }

    if (orders.length === 0) {
        return (
            <StatusPanel
                title='No orders yet'
                body='Orders you place on this device show up here with their delivery status.'
                actionLabel='Start shopping'
                actionHref='/category'
            />
        )
    }

    return (
        <ul className='space-y-4'>
            {orders.map((order) => (
                <li className='border-border rounded-xl border p-5' key={order.id}>
                    <div className='flex flex-wrap items-baseline justify-between gap-2'>
                        <p className='font-medium'>{order.id}</p>
                        <p className='text-muted-foreground text-sm'>
                            {formatDate(order.placedAt)}
                        </p>
                    </div>

                    <p className='text-muted-foreground mt-1 text-sm'>
                        {order.items.length} item{order.items.length === 1 ? '' : 's'} ·{' '}
                        {formatPrice(order.total)} · {paymentLabel(order.payment)}
                    </p>

                    <ul className='text-muted-foreground mt-3 space-y-1 text-sm'>
                        {order.items.slice(0, 3).map((item) => (
                            <li className='line-clamp-1' key={item.id}>
                                {item.quantity} × {item.title}
                            </li>
                        ))}
                        {order.items.length > 3 && <li>and {order.items.length - 3} more</li>}
                    </ul>

                    <ButtonLink
                        className='mt-4'
                        href={`/track?id=${order.id}`}
                        size='sm'
                        variant='outline'
                    >
                        Track order
                    </ButtonLink>
                </li>
            ))}
        </ul>
    )
}
