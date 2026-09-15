'use client'

import { buttonVariants } from '@/components/ui/Button'
import { inputVariants } from '@/components/ui/Input'
import { SORT_OPTIONS } from '@/lib/sort'
import { cn } from 'cn'
import { useRouter, useSearchParams } from 'next/navigation'
import { useId, useState } from 'react'

export default function ProductToolbar({ total }: { total: number }) {
    const router = useRouter()
    const params = useSearchParams()
    const minId = useId()
    const maxId = useId()
    const sortId = useId()

    const [min, setMin] = useState(params.get('price_min') ?? '')
    const [max, setMax] = useState(params.get('price_max') ?? '')

    function push(next: URLSearchParams) {
        // Any change to filters or sort invalidates whatever page you were on.
        next.delete('page')
        router.push(`?${next.toString()}`, { scroll: false })
    }

    function handleSort(value: string) {
        const next = new URLSearchParams(params)
        if (value === 'relevance') next.delete('sort')
        else next.set('sort', value)
        push(next)
    }

    function handlePrice(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault()
        const next = new URLSearchParams(params)

        for (const [key, value] of [
            ['price_min', min],
            ['price_max', max],
        ] as const) {
            if (value.trim()) next.set(key, value.trim())
            else next.delete(key)
        }

        push(next)
    }

    function handleReset() {
        setMin('')
        setMax('')
        const next = new URLSearchParams(params)
        next.delete('price_min')
        next.delete('price_max')
        next.delete('sort')
        push(next)
    }

    const filtered = Boolean(
        params.get('price_min') || params.get('price_max') || params.get('sort')
    )

    return (
        <div className='border-border mb-6 flex flex-col gap-4 rounded-xl border p-4 lg:flex-row lg:items-end lg:justify-between'>
            <form className='flex flex-wrap items-end gap-3' onSubmit={handlePrice}>
                <div className='space-y-1.5'>
                    <label className='text-sm font-medium' htmlFor={minId}>
                        Min price
                    </label>
                    <input
                        className={cn(inputVariants(), 'ml-2 w-28')}
                        id={minId}
                        type='number'
                        min={0}
                        value={min}
                        onChange={(event) => setMin(event.target.value)}
                        placeholder='0'
                    />
                </div>

                <div className='space-y-1.5'>
                    <label className='text-sm font-medium' htmlFor={maxId}>
                        Max price
                    </label>
                    <input
                        className={cn(inputVariants(), 'ml-2 w-28')}
                        id={maxId}
                        type='number'
                        min={0}
                        value={max}
                        onChange={(event) => setMax(event.target.value)}
                        placeholder='Any'
                    />
                </div>

                <button className={buttonVariants({ variant: 'secondary' })} type='submit'>
                    Apply
                </button>

                {filtered && (
                    <button
                        className={buttonVariants({ variant: 'ghost' })}
                        onClick={handleReset}
                        type='button'
                    >
                        Clear
                    </button>
                )}
            </form>

            <div className='flex items-end gap-3'>
                <p className='text-muted-foreground pb-2.5 text-sm'>
                    {total} {total === 1 ? 'product' : 'products'}
                </p>

                <div className='space-y-1.5'>
                    <label className='text-sm font-medium' htmlFor={sortId}>
                        Sort by
                    </label>
                    <select
                        className={cn(inputVariants(), 'ml-2 w-48')}
                        id={sortId}
                        value={params.get('sort') ?? 'relevance'}
                        onChange={(event) => handleSort(event.target.value)}
                    >
                        {SORT_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    )
}
