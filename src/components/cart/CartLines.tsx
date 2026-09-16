'use client'

import QuantityStepper from '@/components/product/QuantityStepper'
import Button from '@/components/ui/Button'
import StatusPanel from '@/components/ui/StatusPanel'
import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/lib/format'
import { Trash2 } from 'lucide-react'
import Link from 'next/link'
import UImage from '../utilities/UImage'

export default function CartLines() {
    const { items, setQuantity, remove, clear, ready } = useCart()

    if (!ready) {
        return <div className='border-border h-64 animate-pulse rounded-xl border' />
    }

    if (items.length === 0) {
        return (
            <StatusPanel
                title='Your cart is empty'
                body='Anything you add stays here on this device until you check out.'
                actionLabel='Start shopping'
                actionHref='/category'
            />
        )
    }

    return (
        <div>
            <ul className='border-border divide-border divide-y rounded-xl border'>
                {items.map((item) => (
                    <li className='flex gap-4 p-4' key={item.id}>
                        <Link
                            className='bg-muted relative size-20 shrink-0 overflow-hidden rounded-lg'
                            href={`/product/${item.slug}`}
                        >
                            <UImage className='object-cover' src={item.image} alt='' sizes='80px' />
                        </Link>

                        <div className='grow space-y-2'>
                            <Link
                                className='hover:text-primary line-clamp-2 text-sm font-medium'
                                href={`/product/${item.slug}`}
                            >
                                {item.title}
                            </Link>

                            <p className='text-muted-foreground text-sm'>
                                {formatPrice(item.price)} each
                            </p>

                            {/* min={0} is deliberate: the store removes a line
                                when its quantity drops below one, so the minus
                                button at quantity 1 is the fast way out. The
                                explicit remove button stays for discoverability. */}
                            <QuantityStepper
                                value={item.quantity}
                                onChange={(value) => setQuantity(item.id, value)}
                                min={0}
                                label={`Quantity for ${item.title}`}
                            />
                        </div>

                        <div className='flex flex-col items-end justify-between'>
                            <button
                                className='text-muted-foreground hover:text-destructive transition-colors'
                                onClick={() => remove(item.id)}
                                type='button'
                                aria-label={`Remove ${item.title}`}
                            >
                                <Trash2 className='size-4' />
                            </button>

                            <p className='font-semibold tabular-nums'>
                                {formatPrice(item.price * item.quantity)}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>

            <Button className='mt-3' onClick={clear} size='sm' variant='ghost'>
                Empty cart
            </Button>
        </div>
    )
}
