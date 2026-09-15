export function productHref(product: Product) {
    return `/product/${product.slug ?? product.id}`
}
