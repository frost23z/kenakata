import ProductGallery from '@/components/product/ProductGallery'
import ProductGrid from '@/components/product/ProductGrid'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import Button from '@/components/ui/Button'
import UMain from '@/components/utilities/UMain'
import USection from '@/components/utilities/USection'
import { getProductBySlugOrId, getProducts, getProductsRelatedById } from '@/lib/api/products'
import { formatPrice } from '@/lib/format'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
    try {
        const products = await getProducts({ limit: 20, offset: 0 })
        return products.map((product) => ({ slug: product.slug ?? String(product.id) }))
    } catch {
        return []
    }
}

export async function generateMetadata({
    params,
}: PageProps<'/product/[slug]'>): Promise<Metadata> {
    const { slug } = await params

    try {
        const product = await getProductBySlugOrId(slug)
        return {
            title: product.title,
            description: product.description.slice(0, 160),
            openGraph: { images: product.images.slice(0, 1) },
        }
    } catch {
        return { title: 'Product' }
    }
}

export default async function ProductPage({ params }: PageProps<'/product/[slug]'>) {
    const { slug } = await params

    let product: Product

    try {
        product = await getProductBySlugOrId(slug)
    } catch {
        notFound()
    }

    const related = await getProductsRelatedById(product.id).catch(() => [])
    const images = product.images

    return (
        <UMain className='flex flex-col justify-center py-4 lg:py-6'>
            <Breadcrumbs
                items={[
                    { label: 'Categories', href: '/category' },
                    ...(product.category
                        ? [
                              {
                                  label: product.category.name,
                                  href: `/category/${product.category.slug}`,
                              },
                          ]
                        : []),
                    { label: product.title },
                ]}
            />

            <div className='grid gap-10 lg:grid-cols-2'>
                <ProductGallery images={images} title={product.title} />

                <div className='space-y-6'>
                    {product.category && (
                        <Link
                            className='text-primary text-sm font-medium'
                            href={`/category/${product.category.slug}`}
                        >
                            {product.category.name}
                        </Link>
                    )}

                    <h1 className='text-2xl font-semibold tracking-tight text-balance sm:text-3xl'>
                        {product.title}
                    </h1>

                    <p className='text-3xl font-semibold'>{formatPrice(product.price)}</p>

                    <p className='text-muted-foreground text-sm leading-relaxed text-pretty'>
                        {product.description}
                    </p>

                    <Button className='grow sm:grow-0' type='button' size='lg'>
                        Add to cart
                    </Button>

                    <dl className='border-border divide-border divide-y rounded-xl border text-sm'>
                        <div className='flex justify-between p-4'>
                            <dt className='text-muted-foreground'>Delivery</dt>
                            <dd>1-2 days in Dhaka, 2-4 days elsewhere</dd>
                        </div>
                        <div className='flex justify-between p-4'>
                            <dt className='text-muted-foreground'>Returns</dt>
                            <dd>7 days, unused and in original packaging</dd>
                        </div>
                        <div className='flex justify-between p-4'>
                            <dt className='text-muted-foreground'>Payment</dt>
                            <dd>bKash, Nagad, card or cash on delivery</dd>
                        </div>
                    </dl>
                </div>
            </div>

            {related.length > 0 && (
                <USection className='mt-16' title='Customers also viewed'>
                    <ProductGrid products={related.slice(0, 4)} />
                </USection>
            )}
        </UMain>
    )
}
