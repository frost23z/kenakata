import { Skeleton } from '@/components/ui/Skeleton'
import UMain from '@/components/utilities/UMain'

export default function Loading() {
    return (
        <UMain className='flex flex-col justify-center py-4 lg:py-6'>
            <Skeleton className='h-4 w-56' />

            <div className='mt-6 grid gap-10 lg:grid-cols-2'>
                <div className='flex flex-col gap-3'>
                    <Skeleton className='aspect-square rounded-xl' />
                    <div className='flex gap-3'>
                        {Array.from({ length: 4 }).map((_, index) => (
                            <Skeleton className='size-16 shrink-0 rounded-lg' key={index} />
                        ))}
                    </div>
                </div>

                <div className='space-y-6'>
                    <Skeleton className='h-4 w-24' />
                    <Skeleton className='h-9 w-3/4' />
                    <Skeleton className='h-9 w-32' />
                    <div className='space-y-2'>
                        <Skeleton className='h-4 w-full' />
                        <Skeleton className='h-4 w-full' />
                        <Skeleton className='h-4 w-2/3' />
                    </div>
                    <Skeleton className='h-12 w-full' />
                    <Skeleton className='h-32 rounded-xl' />
                </div>
            </div>
        </UMain>
    )
}
