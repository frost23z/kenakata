import ProductCard from '@/components/product/ProductCard'
import StatusPanel from '@/components/ui/StatusPanel'

export default function ProductGrid({ products }: { products: Product[] }) {
    if (products.length === 0) {
        return (
            <StatusPanel
                title='No products to show'
                body='Try a different search, category, or check back later.'
            />
        )
    }

    return (
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4'>
            {products.map((product, index) => (
                <ProductCard key={product.id} product={product} priority={index < 4} />
            ))}
        </div>
    )
}
