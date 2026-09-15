import { cn } from 'cn'

/** Base pulsing block. Compose it rather than hardcoding skeleton markup per page. */
export function Skeleton({ className = '' }: { className?: string }) {
    return <div className={cn('bg-muted animate-pulse rounded-md', className)} />
}

export function ProductCardSkeleton() {
    return (
        <div className='border-border rounded-xl border p-4'>
            <Skeleton className='aspect-square rounded-lg' />
            <Skeleton className='mt-4 h-4 w-3/4' />
            <Skeleton className='mt-2 h-4 w-1/3' />
        </div>
    )
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
    return (
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4'>
            {Array.from({ length: count }).map((_, index) => (
                <ProductCardSkeleton key={index} />
            ))}
        </div>
    )
}
