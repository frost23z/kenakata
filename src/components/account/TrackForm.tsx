'use client'

import Button from '@/components/ui/Button'
import Field from '@/components/ui/Input'
import StatusPanel from '@/components/ui/StatusPanel'
import { formatDate, formatPrice } from '@/lib/format'
import {
    getOrdersSnapshot,
    getServerOrdersSnapshot,
    matchOrder,
    orderStatus,
    subscribeOrders,
} from '@/lib/orders'
import { paymentLabel } from '@/lib/schemas/checkout'
import { useState, useSyncExternalStore } from 'react'

const STAGES: { status: OrderStatus; label: string }[] = [
    { status: 'placed', label: 'Order placed' },
    { status: 'packed', label: 'Packed by the seller' },
    { status: 'shipped', label: 'Out for delivery' },
    { status: 'delivered', label: 'Delivered' },
]

type TrackFormProps = {
    /** Comes from `?id=` so the confirmation panel can link straight to a result. */
    defaultCode?: string
}

export default function TrackForm({ defaultCode = '' }: TrackFormProps) {
    const [code, setCode] = useState(defaultCode)
    // `submittedCode` tracks manual lookups; `defaultCode` covers the deep link.
    const [submittedCode, setSubmittedCode] = useState<string | null>(null)

    // The snapshot is the whole orders array, cached by the store. The lookup
    // is derived from that array during render, so it never produces a fresh
    // object for React to compare — which is the trap with returning
    // `findOrder(code)` straight out of `getSnapshot`.
    const orders = useSyncExternalStore(subscribeOrders, getOrdersSnapshot, getServerOrdersSnapshot)

    const activeCode = submittedCode ?? defaultCode

    // `undefined` means nothing looked up yet (or nothing read yet), `null`
    // means looked up and not found — two different screens.
    const order = activeCode && orders ? matchOrder(orders, activeCode) : undefined

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setSubmittedCode(code)
    }

    const reached = order ? STAGES.findIndex((stage) => stage.status === orderStatus(order)) : -1

    return (
        <div className='space-y-8'>
            <form className='flex items-end gap-3' onSubmit={handleSubmit}>
                <Field
                    label='Order number'
                    onChange={(event) => setCode(event.target.value)}
                    placeholder='KEN-XXXXXXXX'
                    required
                    value={code}
                    wrapperClassName='grow'
                />
                <Button type='submit'>Track</Button>
            </form>

            {order === null && (
                <StatusPanel
                    title='No order with that number'
                    body='Orders are stored in this browser, so an order placed on another device or in a private window will not be found here.'
                    actionLabel='Browse products'
                    actionHref='/category'
                />
            )}

            {order && (
                <section className='border-border rounded-xl border p-5'>
                    <div className='flex flex-wrap items-baseline justify-between gap-2'>
                        <p className='font-medium'>{order.id}</p>
                        <p className='text-muted-foreground text-sm'>
                            Placed {formatDate(order.placedAt)}
                        </p>
                    </div>

                    <p className='text-muted-foreground mt-1 text-sm'>
                        {order.items.length} item{order.items.length === 1 ? '' : 's'} ·{' '}
                        {formatPrice(order.total)} · {paymentLabel(order.payment)}
                    </p>

                    <ol className='mt-6 space-y-4'>
                        {STAGES.map((stage, index) => {
                            const done = index <= reached

                            return (
                                <li className='flex items-start gap-3 text-sm' key={stage.status}>
                                    <span
                                        className={`mt-1.5 size-2.5 shrink-0 rounded-full ${
                                            done ? 'bg-primary' : 'bg-border'
                                        }`}
                                        aria-hidden
                                    />
                                    <span className={done ? '' : 'text-muted-foreground'}>
                                        {stage.label}
                                    </span>
                                </li>
                            )
                        })}
                    </ol>

                    <p className='text-muted-foreground mt-6 text-xs'>
                        Delivery progress is simulated for this demo — there is no courier behind
                        it.
                    </p>
                </section>
            )}
        </div>
    )
}
