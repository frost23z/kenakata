import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

type Crumb = {
    label: string
    href?: string
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
    return (
        <nav
            className='text-muted-foreground mb-6 flex flex-wrap items-center gap-1.5 text-sm'
            aria-label='Breadcrumb'
        >
            <Link className='hover:text-foreground transition-colors' href='/'>
                Home
            </Link>

            {items.map((item, index) => {
                const isLast = index === items.length - 1

                return (
                    <span className='flex items-center gap-1.5' key={item.label}>
                        <ChevronRight className='size-3.5 shrink-0' aria-hidden />
                        {item.href && !isLast ? (
                            <Link
                                className='hover:text-foreground transition-colors'
                                href={item.href}
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span
                                className='text-foreground max-w-48 truncate font-medium sm:max-w-none'
                                aria-current={isLast ? 'page' : undefined}
                            >
                                {item.label}
                            </span>
                        )}
                    </span>
                )
            })}
        </nav>
    )
}
