import { request } from '@/lib/api/client'

function buildQuery(filters: ProductFilters) {
    const params = new URLSearchParams()

    for (const [key, value] of Object.entries(filters)) {
        if (value !== undefined && value !== null && value !== '') {
            params.set(key, String(value))
        }
    }

    const query = params.toString()

    return query ? `?${query}` : ''
}

export async function getProducts(filters: ProductFilters = {}): Promise<Product[]> {
    return request<Product[]>(`/products${buildQuery(filters)}`)
}

export async function getProductById(id: number): Promise<Product> {
    return request<Product>(`/products/${id}`)
}

export async function getProductBySlug(slug: string): Promise<Product> {
    return request<Product>(`/products/slug/${slug}`)
}

export async function getProductBySlugOrId(param: string): Promise<Product> {
    try {
        return await getProductBySlug(param)
    } catch {
        const id = Number(param)
        if (!Number.isFinite(id)) throw new Error(`Not a valid product slug or id: ${param}`)
        return await getProductById(id)
    }
}

export async function getProductsRelatedById(id: number): Promise<Product[]> {
    return request<Product[]>(`/products/${id}/related`)
}

export async function getProductsRelatedBySlug(slug: string): Promise<Product[]> {
    return request<Product[]>(`/products/slug/${slug}/related`)
}
