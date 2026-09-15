import { Skeleton } from '@/components/ui/Skeleton'
import UMain from '@/components/utilities/UMain'

export default function Loading() {
    return (
        <UMain className='flex flex-col justify-center py-4 lg:py-6'>
            <Skeleton className='h-4 w-40' />
            <Skeleton className='mt-4 h-8 w-56' />
            <Skeleton className='mt-2 h-4 w-64' />

            <div className='mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5'>
                {Array.from({ length: 10 }).map((_, index) => (
                    <div className='border-border overflow-hidden rounded-xl border' key={index}>
                        <Skeleton className='aspect-4/3 rounded-none' />
                        <div className='p-3'>
                            <Skeleton className='h-4 w-2/3' />
                        </div>
                    </div>
                ))}
            </div>
        </UMain>
    )
}
