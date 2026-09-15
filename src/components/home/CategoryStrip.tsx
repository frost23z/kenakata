import UImage from '@/components/utilities/UImage'
import Link from 'next/link'

export default function CategoryStrip({ categories }: { categories: Category[] }) {
    if (categories.length === 0) return null

    return (
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5'>
            {categories.map((category) => (
                <Link
                    className='group border-border bg-card overflow-hidden rounded-xl border transition-shadow hover:shadow-md'
                    key={category.id}
                    href={`/category/${category.slug}`}
                >
                    <div className='bg-muted relative aspect-4/3 overflow-hidden'>
                        <UImage
                            className='object-cover transition-transform duration-300 group-hover:scale-105'
                            src={category.image}
                            alt=''
                            sizes='(min-width: 1024px) 20vw, 50vw'
                        />
                    </div>
                    <p className='p-3 text-sm font-medium'>{category.name}</p>
                </Link>
            ))}
        </div>
    )
}
