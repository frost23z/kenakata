export const PAGE_SIZE = 12

export const SORT_OPTIONS = [
    { value: 'relevance', label: 'Most relevant' },
    { value: 'price-asc', label: 'Price: low to high' },
    { value: 'price-desc', label: 'Price: high to low' },
    { value: 'title', label: 'Name: A to Z' },
] as const

export type SortKey = (typeof SORT_OPTIONS)[number]['value']

/**
 * The price_min/price_max query params are sent to the API as an
 * optimization, but the API only honors them when *both* are present in the
 * same request — send price_max alone (the common case: user sets a max,
 * leaves min blank) and it silently ignores the filter and returns
 * everything. So, like sorting, the range is re-applied here after fetching
 * to guarantee correctness regardless of what the API did with the params.
 */
export function filterByPrice(products: Product[], min?: number, max?: number): Product[] {
    return products.filter(
        (product) =>
            (min === undefined || product.price >= min) &&
            (max === undefined || product.price <= max)
    )
}

/**
 * The API has no sort parameter, so ordering happens after fetching. Page size
 * is small enough that this stays cheap.
 */
export function sortProducts(products: Product[], sort: string | undefined): Product[] {
    const sorted = [...products]

    switch (sort) {
        case 'price-asc':
            return sorted.sort((a, b) => a.price - b.price)
        case 'price-desc':
            return sorted.sort((a, b) => b.price - a.price)
        case 'title':
            return sorted.sort((a, b) => a.title.localeCompare(b.title))
        default:
            return sorted
    }
}

export function paginate<T>(items: T[], page: number, size = PAGE_SIZE) {
    const pageCount = Math.max(1, Math.ceil(items.length / size))
    const current = Math.min(Math.max(1, page), pageCount)

    return {
        page: current,
        pageCount,
        items: items.slice((current - 1) * size, current * size),
    }
}

/** Query strings are untrusted: anything that is not a positive integer is page 1. */
export function toPage(value: string | undefined) {
    const parsed = Number(value)

    return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : 1
}
