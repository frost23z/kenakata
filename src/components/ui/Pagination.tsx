import { buttonVariants } from '@/components/ui/Button'
import { cn } from 'cn'
import Link from 'next/link'

type PaginationProps = {
    page: number
    pageCount: number
    basePath: string
    params?: Record<string, string | undefined>
}

function hrefFor(basePath: string, params: Record<string, string | undefined>, page: number) {
    const search = new URLSearchParams()

    for (const [key, value] of Object.entries(params)) {
        if (value) search.set(key, value)
    }

    if (page > 1) search.set('page', String(page))

    const query = search.toString()

    return query ? `${basePath}?${query}` : basePath
}

/**
 * Pure server component — every page is a real `<Link>`, so pagination works
 * without JavaScript and each page is a distinct, crawlable url.
 */
export default function Pagination({ page, pageCount, basePath, params = {} }: PaginationProps) {
    if (pageCount <= 1) return null

    const pages = Array.from({ length: pageCount }, (_, index) => index + 1).filter(
        (entry) => entry === 1 || entry === pageCount || Math.abs(entry - page) <= 1
    )

    return (
        <nav className='mt-10 flex items-center justify-center gap-1' aria-label='Pagination'>
            {page > 1 && (
                <Link
                    className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
                    href={hrefFor(basePath, params, page - 1)}
                    rel='prev'
                >
                    Previous
                </Link>
            )}

            {pages.map((entry, index) => (
                <span className='flex items-center gap-1' key={entry}>
                    {index > 0 && entry - pages[index - 1] > 1 && (
                        <span className='text-muted-foreground px-1 text-sm'>&hellip;</span>
                    )}
                    <Link
                        className={cn(
                            buttonVariants({
                                variant: entry === page ? 'primary' : 'ghost',
                                size: 'sm',
                            })
                        )}
                        href={hrefFor(basePath, params, entry)}
                        aria-current={entry === page ? 'page' : undefined}
                    >
                        {entry}
                    </Link>
                </span>
            ))}

            {page < pageCount && (
                <Link
                    className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
                    href={hrefFor(basePath, params, page + 1)}
                    rel='next'
                >
                    Next
                </Link>
            )}
        </nav>
    )
}
