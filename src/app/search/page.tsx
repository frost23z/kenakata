import ProductGrid from '@/components/product/ProductGrid'
import ProductToolbar from '@/components/product/ProductToolbar'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import Pagination from '@/components/ui/Pagination'
import StatusPanel from '@/components/ui/StatusPanel'
import UMain from '@/components/utilities/UMain'
import { getProducts } from '@/lib/api/products'
import { filterByPrice, paginate, sortProducts, toPage } from '@/lib/sort'
import type { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
    title: 'Search',
    description: 'Search the Kenakata catalogue.',
}

function first(value: string | string[] | undefined) {
    return Array.isArray(value) ? value[0] : value
}

export default async function SearchPage({ searchParams }: PageProps<'/search'>) {
    const query = await searchParams
    const term = first(query.q)?.trim() ?? ''

    const priceMin = Number(first(query.price_min)) || undefined
    const priceMax = Number(first(query.price_max)) || undefined

    // No term, no fetch — an empty title filter would return the whole
    // catalogue rather than nothing, which isn't what "search" should show.
    const products = term
        ? await getProducts({
              title: term,
              price_min: priceMin,
              price_max: priceMax,
              limit: 100,
          })
        : []

    const priceFiltered = filterByPrice(products, priceMin, priceMax)
    const sorted = sortProducts(priceFiltered, first(query.sort))
    const { items, page, pageCount } = paginate(sorted, toPage(first(query.page)))

    return (
        <UMain className='flex flex-col justify-center py-4 lg:py-6'>
            <Breadcrumbs items={[{ label: 'Search' }]} />

            <h1 className='mb-6 text-2xl font-semibold tracking-tight sm:text-3xl'>
                {term ? `Results for “${term}”` : 'Search'}
            </h1>

            {!term ? (
                <StatusPanel
                    title='Type something to search'
                    body='Use the search box at the top of the page to look up products by name.'
                    actionLabel='Browse categories'
                    actionHref='/category'
                />
            ) : items.length > 0 ? (
                <>
                    <Suspense
                        fallback={<div className='border-border mb-6 h-28 rounded-xl border' />}
                    >
                        <ProductToolbar total={sorted.length} />
                    </Suspense>

                    <ProductGrid products={items} />

                    <Pagination
                        basePath='/search'
                        page={page}
                        pageCount={pageCount}
                        params={{
                            q: term,
                            sort: first(query.sort),
                            price_min: first(query.price_min),
                            price_max: first(query.price_max),
                        }}
                    />
                </>
            ) : (
                <StatusPanel
                    title={`No products match “${term}”`}
                    body='Check the spelling, use fewer words, or browse the categories instead.'
                    actionLabel='Browse categories'
                    actionHref='/category'
                />
            )}
        </UMain>
    )
}
