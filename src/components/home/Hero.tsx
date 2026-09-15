import { ButtonLink } from '@/components/ui/Button'

export default function Hero() {
    return (
        <section className='bg-card border-border relative overflow-hidden rounded-2xl border px-6 py-14 sm:px-12 sm:py-20'>
            <div
                className='from-primary/15 absolute inset-0 bg-linear-to-br to-transparent'
                aria-hidden
            />

            <div className='relative max-w-xl'>
                <p className='text-primary text-sm font-medium'>Delivering across Bangladesh</p>
                <h1 className='mt-3 text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-5xl'>
                    Everything for the home, at prices that make sense
                </h1>
                <p className='text-muted-foreground mt-4 text-base text-pretty'>
                    Electronics, clothing, furniture and daily essentials from verified sellers. Pay
                    with bKash, Nagad, card, or cash when your parcel arrives.
                </p>

                <div className='mt-8 flex flex-col gap-3 sm:flex-row'>
                    <ButtonLink href='/category' size='lg'>
                        Start shopping
                    </ButtonLink>
                    <ButtonLink href='/offers' size='lg' variant='outline'>
                        See this week&rsquo;s offers
                    </ButtonLink>
                </div>
            </div>
        </section>
    )
}
