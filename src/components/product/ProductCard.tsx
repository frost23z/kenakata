import AddToCart from '@/components/product/AddToCart'
import WishlistButton from '@/components/product/WishlistButton'
import UImage from '@/components/utilities/UImage'
import { formatPrice } from '@/lib/format'
import { productHref, toCartItem } from '@/lib/product'
import Link from 'next/link'

export default function ProductCard({
    product,
    priority = false,
}: {
    product: Product
    priority?: boolean
}) {
    const image = product.images?.[0] ?? PLACEHOLDER_IMAGE
    const href = productHref(product)
    const item = toCartItem(product)

    return (
        <article className='group border-border bg-card text-card-foreground relative flex flex-col overflow-hidden rounded-xl border transition-shadow hover:shadow-md'>
            <div className='bg-muted relative aspect-square overflow-hidden'>
                <Link href={href} tabIndex={-1} aria-hidden>
                    <UImage
                        className='object-cover transition-transform duration-300 group-hover:scale-105'
                        src={image}
                        alt=''
                        priority={priority}
                    />
                </Link>
                <WishlistButton className='absolute inset-e-2 top-2 z-10' item={item} />
            </div>

            <div className='flex grow flex-col gap-2 p-4'>
                {product.category && (
                    <p className='text-muted-foreground text-xs'>{product.category.name}</p>
                )}

                <h3 className='text-sm leading-snug font-medium'>
                    <Link className='hover:text-primary after:absolute after:inset-0' href={href}>
                        {product.title}
                    </Link>
                </h3>

                <p className='mt-auto text-base font-semibold'>{formatPrice(product.price)}</p>

                <AddToCart className='relative w-full' item={item} size='sm' />
            </div>
        </article>
    )
}
