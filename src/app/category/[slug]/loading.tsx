import { ProductGridSkeleton, Skeleton } from '@/components/ui/Skeleton'
import UMain from '@/components/utilities/UMain'

export default function Loading() {
    return (
        <UMain className='flex flex-col justify-center py-4 lg:py-6'>
            <Skeleton className='h-4 w-48' />
            <Skeleton className='mt-4 mb-6 h-8 w-64' />
            <Skeleton className='mb-6 h-28 rounded-xl' />
            <ProductGridSkeleton />
        </UMain>
    )
}
