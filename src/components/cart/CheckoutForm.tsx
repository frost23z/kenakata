'use client'

import OrderSummary from '@/components/cart/OrderSummary'
import Button, { ButtonLink } from '@/components/ui/Button'
import Field, { inputVariants } from '@/components/ui/Input'
import StatusPanel from '@/components/ui/StatusPanel'
import { useCart } from '@/hooks/useCart'
import { cartTotals } from '@/lib/cart-total'
import { formatPrice } from '@/lib/format'
import { createOrderId, saveOrder } from '@/lib/orders'
import type { CheckoutValues } from '@/lib/schemas/checkout'
import { checkoutSchema, PAYMENT_OPTIONS, paymentLabel } from '@/lib/schemas/checkout'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from 'cn'
import { CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

type CheckoutFormProps = {
    defaultName?: string
    defaultEmail?: string
}

/** Stand-in for the payment gateway round trip. */
const PROCESSING_MS = 1200

export default function CheckoutForm({ defaultName = '', defaultEmail = '' }: CheckoutFormProps) {
    const { items, subtotal, clear, ready } = useCart()
    const [placed, setPlaced] = useState<Order | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<CheckoutValues>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            name: defaultName,
            email: defaultEmail,
            phone: '',
            address: '',
            city: '',
            payment: 'cod',
        },
    })

    async function onSubmit(values: CheckoutValues) {
        const totals = cartTotals(subtotal)

        // Awaiting inside the submit handler keeps `isSubmitting` true for the
        // whole round trip, so the button's pending state needs no extra flag.
        await new Promise((resolve) => setTimeout(resolve, PROCESSING_MS))

        const order: Order = {
            ...values,
            id: createOrderId(),
            placedAt: new Date().toISOString(),
            items,
            subtotal: totals.subtotal,
            delivery: totals.delivery,
            total: totals.total,
        }

        saveOrder(order)
        clear()
        setPlaced(order)
    }

    // Order matters: placing an order empties the cart, so the confirmation
    // has to win over the empty-cart panel or the customer sees "nothing to
    // check out" the instant their order succeeds.
    if (placed) {
        return (
            <div className='border-border max-w-lg rounded-xl border p-6'>
                <CheckCircle2 className='text-primary size-8' aria-hidden />

                <h2 className='mt-4 text-lg font-semibold'>Order placed</h2>

                <p className='text-muted-foreground mt-2 text-sm text-pretty'>
                    We have sent a confirmation to {placed.email} and will call {placed.phone}{' '}
                    before delivery.
                </p>

                <dl className='border-border divide-border mt-6 divide-y border-y text-sm'>
                    <div className='flex justify-between py-3'>
                        <dt className='text-muted-foreground'>Order number</dt>
                        <dd className='font-medium'>{placed.id}</dd>
                    </div>
                    <div className='flex justify-between py-3'>
                        <dt className='text-muted-foreground'>Payment</dt>
                        <dd>{paymentLabel(placed.payment)}</dd>
                    </div>
                    <div className='flex justify-between py-3'>
                        <dt className='text-muted-foreground'>Total</dt>
                        <dd className='font-semibold'>{formatPrice(placed.total)}</dd>
                    </div>
                </dl>

                <div className='mt-6 flex flex-wrap gap-3'>
                    <ButtonLink href={`/track?id=${placed.id}`}>Track this order</ButtonLink>
                    <ButtonLink href='/category' variant='outline'>
                        Keep shopping
                    </ButtonLink>
                </div>
            </div>
        )
    }

    if (!ready) {
        return <div className='border-border h-96 animate-pulse rounded-xl border' />
    }

    if (items.length === 0) {
        return (
            <StatusPanel
                title='Nothing to check out'
                body='Add something to your cart first, then come back here to place the order.'
                actionLabel='Start shopping'
                actionHref='/category'
            />
        )
    }

    return (
        <form
            className='grid items-start gap-8 lg:grid-cols-[2fr_1fr]'
            onSubmit={handleSubmit(onSubmit)}
            noValidate
        >
            <div className='space-y-6'>
                <section className='border-border space-y-4 rounded-xl border p-5'>
                    <h2 className='text-base font-semibold'>Delivery address</h2>

                    <div className='grid gap-4 sm:grid-cols-2'>
                        <Field
                            label='Full name'
                            autoComplete='name'
                            error={errors.name?.message}
                            {...register('name')}
                        />

                        <Field
                            label='Email'
                            autoComplete='email'
                            error={errors.email?.message}
                            type='email'
                            {...register('email')}
                        />

                        <Field
                            label='Mobile number'
                            autoComplete='tel'
                            error={errors.phone?.message}
                            hint='We only use this for the delivery call.'
                            inputMode='numeric'
                            placeholder='01XXXXXXXXX'
                            type='tel'
                            {...register('phone')}
                        />

                        <Field
                            label='City'
                            autoComplete='address-level2'
                            error={errors.city?.message}
                            {...register('city')}
                        />
                    </div>

                    {/* Children need their own id: Field's generated fallback is
                        only handed to the input it renders itself. */}
                    <Field id='address' label='Street address' error={errors.address?.message}>
                        <textarea
                            id='address'
                            className={cn(
                                inputVariants({ invalid: Boolean(errors.address) }),
                                'h-24 py-2'
                            )}
                            autoComplete='street-address'
                            aria-invalid={Boolean(errors.address)}
                            {...register('address')}
                        />
                    </Field>
                </section>

                <fieldset className='border-border space-y-3 rounded-xl border p-5'>
                    <legend className='text-base font-semibold'>Payment</legend>

                    {PAYMENT_OPTIONS.map((option) => (
                        <label
                            className='border-border hover:bg-accent flex cursor-pointer items-start gap-3 rounded-md border p-3 text-sm transition-colors'
                            key={option.value}
                        >
                            <input
                                className='mt-0.5'
                                type='radio'
                                value={option.value}
                                {...register('payment')}
                            />
                            <span>
                                <span className='font-medium'>{option.label}</span>
                                <span className='text-muted-foreground block text-xs'>
                                    {option.hint}
                                </span>
                            </span>
                        </label>
                    ))}

                    {errors.payment && (
                        <p className='text-destructive text-xs' role='alert'>
                            {errors.payment.message}
                        </p>
                    )}
                </fieldset>
            </div>

            <OrderSummary showLines>
                <Button className='mt-5 w-full' disabled={isSubmitting} size='lg' type='submit'>
                    {isSubmitting ? 'Processing payment…' : 'Place order'}
                </Button>

                <p className='text-muted-foreground mt-3 text-xs'>
                    This is a demo storefront. No payment is taken and no order is sent anywhere.
                </p>
            </OrderSummary>
        </form>
    )
}
