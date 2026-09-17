'use client'

import { buttonVariants } from '@/components/ui/Button'
import { cn } from 'cn'
import { Search } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useId, useState } from 'react'

export default function SearchBar({ className = '' }: { className?: string }) {
    const router = useRouter()
    const pathname = usePathname()
    const params = useSearchParams()
    const inputId = useId()

    // Only adopt ?q while we're actually on /search — everywhere else the url
    // has no opinion about the search box, so leave whatever was typed alone.
    const urlTerm = pathname === '/search' ? (params.get('q') ?? '') : null

    const [term, setTerm] = useState(urlTerm ?? '')
    const [lastUrlTerm, setLastUrlTerm] = useState(urlTerm)

    // Derived state during render instead of useEffect: when ?q changes under
    // us (back button, a link straight into /search) the box follows the url.
    if (urlTerm !== lastUrlTerm) {
        setLastUrlTerm(urlTerm)
        if (urlTerm !== null) setTerm(urlTerm)
    }

    function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault()
        const trimmed = term.trim()
        if (!trimmed) return
        router.push(`/search?q=${encodeURIComponent(trimmed)}`)
    }

    return (
        <form className={cn('relative', className)} onSubmit={handleSubmit} role='search'>
            <label className='sr-only' htmlFor={inputId}>
                Search products
            </label>

            <Search
                className='text-muted-foreground pointer-events-none absolute inset-s-3 top-1/2 size-5 -translate-y-1/2'
                aria-hidden
            />

            <input
                className='border-input bg-background focus:border-ring focus:ring-ring/30 h-10 w-full rounded-full border ps-10 pe-24 text-sm transition-colors focus:ring-2 focus:outline-none'
                id={inputId}
                name='q'
                type='search'
                value={term}
                onChange={(event) => setTerm(event.target.value)}
                placeholder='Search products'
                autoComplete='off'
            />

            <button
                className={cn(
                    buttonVariants({ size: 'sm' }),
                    'absolute inset-e-1 top-1/2 -translate-y-1/2 rounded-full'
                )}
                type='submit'
            >
                Search
            </button>
        </form>
    )
}
