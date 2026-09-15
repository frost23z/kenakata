type Product = {
    id: number
    title: string
    price: number
    description: string
    categoryId: number
    category?: Category
    images: string[]
    slug?: string
    creationAt?: string
    updatedAt?: string
}

type ProductFilters = {
    title?: string
    price?: number
    price_min?: number
    price_max?: number
    categoryId?: number
    categorySlug?: string
    limit?: number
    offset?: number
}
