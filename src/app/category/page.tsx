import CategoryStrip from '@/components/home/CategoryStrip'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import StatusPanel from '@/components/ui/StatusPanel'
import UMain from '@/components/utilities/UMain'
import { getCategories } from '@/lib/api/categories'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'All categories',
    description: 'Browse every product category available on Kenakata.',
}

export default async function CategoriesPage() {
    const categories = await getCategories()

    return (
        <UMain className='flex flex-col justify-center py-4 lg:py-6'>
            <Breadcrumbs items={[{ label: 'Categories' }]} />

            <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>All categories</h1>
            <p className='text-muted-foreground mt-2 text-sm'>
                {categories.length} categories, updated as sellers add stock.
            </p>

            <div className='mt-8'>
                {categories.length > 0 ? (
                    <CategoryStrip categories={categories} />
                ) : (
                    <StatusPanel
                        title='Categories are unavailable'
                        body='The catalogue service did not respond. Try again in a moment.'
                        actionLabel='Back to home'
                        actionHref='/'
                    />
                )}
            </div>
        </UMain>
    )
}
