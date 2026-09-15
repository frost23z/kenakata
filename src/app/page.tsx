import CategoryStrip from '@/components/home/CategoryStrip'
import Hero from '@/components/home/Hero'
import ProductGrid from '@/components/product/ProductGrid'
import UMain from '@/components/utilities/UMain'
import USection from '@/components/utilities/USection'
import { getCategories } from '@/lib/api/categories'
import { getProducts } from '@/lib/api/products'
export const revalidate = 600

export default async function Home() {
    const [categories, newArrivals, picks] = await Promise.all([
        getCategories(),
        getProducts({ offset: 0, limit: 4 }),
        getProducts({ offset: 20, limit: 8 }),
    ])

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

            <USection
                title='New this week'
                body='Fresh listings from sellers across the country.'
                linkLabel='See more'
                linkHref='/category'
            >
                <ProductGrid products={newArrivals} />
            </USection>

            <USection title='Picked for you' linkLabel='See more' linkHref='/offers'>
                <ProductGrid products={picks} />
            </USection>
        </UMain>
    )
}
