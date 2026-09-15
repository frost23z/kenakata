import CategoryStrip from '@/components/home/CategoryStrip'
import Hero from '@/components/home/Hero'
import UMain from '@/components/utilities/UMain'
import USection from '@/components/utilities/USection'
import { getCategories } from '@/lib/api/categories'
export const revalidate = 600

export default async function Home() {
    const categories = await getCategories()

    return (
        <UMain className='flex flex-col gap-16 py-10 lg:gap-20 lg:py-20'>
            <Hero />

            <USection
                title='Shop by category'
                body='Browse the full catalogue by what you need.'
                linkLabel='All categories'
                linkHref='/category'
            >
                <CategoryStrip categories={categories.slice(0, 5)} />
            </USection>
        </UMain>
    )
}
