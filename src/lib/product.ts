import { PLACEHOLDER_IMAGE } from '@/components/utilities/constants'

export function toCartItem(product: Product): WishlistItem {
    return {
        id: product.id,
        slug: product.slug ?? String(product.id),
        title: product.title,
        price: product.price,
        image: product.images[0] ?? PLACEHOLDER_IMAGE,
    }
}

export function productHref(product: Product) {
    return `/product/${product.slug ?? product.id}`
}
