import { request } from '@/lib/api/client'

export async function getCategories(): Promise<Category[]> {
    return request<Category[]>('/categories')
}

export async function getCategoryById(id: number): Promise<Category> {
    return request<Category>(`/categories/${id}`)
}

export async function getCategoryBySlug(slug: string): Promise<Category> {
    return request<Category>(`/categories/slug/${slug}`)
}

export async function getProductsByCategoryId(id: number): Promise<Product[]> {
    return request<Product[]>(`/categories/${id}/products`)
}
