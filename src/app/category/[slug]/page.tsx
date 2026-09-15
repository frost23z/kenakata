import ProductGrid from '@/components/product/ProductGrid'
import ProductToolbar from '@/components/product/ProductToolbar'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import Pagination from '@/components/ui/Pagination'
import StatusPanel from '@/components/ui/StatusPanel'
import UMain from '@/components/utilities/UMain'
import { getCategories, getCategoryBySlug } from '@/lib/api/categories'
import { getProducts } from '@/lib/api/products'
import { filterByPrice, paginate, sortProducts, toPage } from '@/lib/sort'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

export async function generateStaticParams() {
    const categories = await getCategories()
    return categories.map((category) => ({ slug: category.slug }))
}

export async function generateMetadata({
    params,
}: PageProps<'/category/[slug]'>): Promise<Metadata> {
    const { slug } = await params

    try {
        const category = await getCategoryBySlug(slug)
        return {
            title: category.name,
            description: `Shop ${category.name.toLowerCase()} on Kenakata with delivery across Bangladesh.`,
        }
    } catch {
        return { title: 'Category' }
    }
}

function first(value: string | string[] | undefined) {
    return Array.isArray(value) ? value[0] : value
}

export default async function CategoryPage({
    params,
    searchParams,
}: PageProps<'/category/[slug]'>) {
    const { slug } = await params
    const query = await searchParams

    let category: Category

    try {
        category = await getCategoryBySlug(slug)
    } catch {
        notFound()
    }

    const priceMin = Number(first(query.price_min)) || undefined
    const priceMax = Number(first(query.price_max)) || undefined

    // The API filters products by categoryId, not categorySlug — there's no
    // endpoint that takes the slug directly for product filtering, so the
    // category lookup above also buys us the id this fetch needs.
    const products = await getProducts({
        categoryId: category.id,
        price_min: priceMin,
        price_max: priceMax,
        limit: 100,
    })

    const priceFiltered = filterByPrice(products, priceMin, priceMax)
    const sorted = sortProducts(priceFiltered, first(query.sort))
    const { items, page, pageCount } = paginate(sorted, toPage(first(query.page)))

    return (
        <UMain className='flex flex-col justify-center py-4 lg:py-6'>
            <Breadcrumbs
                items={[{ label: 'Categories', href: '/category' }, { label: category.name }]}
            />

            <h1 className='mb-6 text-2xl font-semibold tracking-tight sm:text-3xl'>
                {category.name}
            </h1>

            <Suspense fallback={<div className='border-border mb-6 h-28 rounded-xl border' />}>
                <ProductToolbar total={sorted.length} />
            </Suspense>

            {items.length > 0 ? (
                <>
                    <ProductGrid products={items} />
                    <Pagination
                        basePath={`/category/${slug}`}
                        page={page}
                        pageCount={pageCount}
                        params={{
                            sort: first(query.sort),
                            price_min: first(query.price_min),
                            price_max: first(query.price_max),
                        }}
                    />
                </>
            ) : (
                <StatusPanel
                    title='Nothing matches those filters'
                    body='Try widening the price range, or browse another category.'
                    actionLabel='All categories'
                    actionHref='/category'
                />
            )}
        </UMain>
    )
}
