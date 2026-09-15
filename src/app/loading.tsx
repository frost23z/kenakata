import { ProductGridSkeleton, Skeleton } from '@/components/ui/Skeleton'
import UMain from '@/components/utilities/UMain'

export default function Loading() {
    return (
        <UMain className='flex flex-col justify-center gap-6 py-10 lg:gap-10 lg:py-20'>
            <Skeleton className='h-8 w-48' />
            <div className='mt-8'>
                <ProductGridSkeleton />
            </div>
        </UMain>
    )
}
