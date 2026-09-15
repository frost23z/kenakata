import NewsletterForm from '@/components/footer/NewsletterForm'
import UContainer from '@/components/utilities/UContainer'
import UFooter from '@/components/utilities/UFooter'
import {
    FOOTER_NAV,
    GUARANTEES,
    PAYMENT_METHODS,
    SITE_NAME,
    SOCIAL_LINKS,
} from '@/components/utilities/constants'
import Link from 'next/link'

export default function Footer() {
    return (
        <UFooter>
            <UContainer className='border-border grid grid-cols-2 gap-6 border-b py-8 lg:grid-cols-4'>
                {GUARANTEES.map(({ Icon, title, body }) => (
                    <div className='flex gap-3' key={title}>
                        <Icon className='text-primary mt-0.5 size-6 shrink-0' />
                        <div>
                            <p className='text-sm font-medium'>{title}</p>
                            <p className='text-muted-foreground text-xs'>{body}</p>
                        </div>
                    </div>
                ))}
            </UContainer>

            <UContainer className='grid gap-10 py-10 lg:grid-cols-[1fr_2fr]'>
                <NewsletterForm />

                <div className='grid grid-cols-2 gap-8 sm:grid-cols-4'>
                    {FOOTER_NAV.map((column) => (
                        <div key={column.heading}>
                            <h3 className='text-sm font-semibold'>{column.heading}</h3>
                            <ul className='mt-3 space-y-2'>
                                {column.links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            className='text-muted-foreground hover:text-primary text-sm transition-colors'
                                            href={link.href}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </UContainer>

            <UContainer className='border-border flex flex-col gap-4 border-t py-6 sm:flex-row sm:items-center sm:justify-between'>
                <p className='text-muted-foreground text-sm'>
                    &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
                </p>

                <ul className='text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-2 text-xs'>
                    {PAYMENT_METHODS.map((method) => (
                        <li className='border-border rounded border px-2 py-1' key={method}>
                            {method}
                        </li>
                    ))}
                </ul>

                <div className='flex items-center gap-3 text-sm'>
                    {SOCIAL_LINKS.map(({ label, href }) => (
                        <a
                            className='text-muted-foreground hover:text-primary transition-colors'
                            key={label}
                            href={href}
                            target='_blank'
                            rel='noreferrer noopener'
                        >
                            {label}
                        </a>
                    ))}
                </div>
            </UContainer>
        </UFooter>
    )
}
