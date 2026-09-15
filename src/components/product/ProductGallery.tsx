'use client'

import UImage from '@/components/utilities/UImage'
import { cn } from 'cn'
import { useState } from 'react'

export default function ProductGallery({ images, title }: { images: string[]; title: string }) {
    const [active, setActive] = useState(0)

    return (
        <div className='flex flex-col gap-3'>
            <div className='bg-muted border-border relative aspect-square overflow-hidden rounded-xl border'>
                <UImage
                    className='object-cover'
                    src={images[active]}
                    alt={title}
                    sizes='(min-width: 1024px) 50vw, 100vw'
                    priority
                />
            </div>

            {images.length > 1 && (
                <div className='flex gap-3'>
                    {images.map((image, index) => (
                        <button
                            className={cn(
                                'bg-muted relative size-16 shrink-0 overflow-hidden rounded-lg border-2 transition-colors',
                                index === active ? 'border-primary' : 'border-border'
                            )}
                            key={`${image}-${index}`}
                            type='button'
                            onClick={() => setActive(index)}
                            aria-label={`View image ${index + 1} of ${images.length}`}
                            aria-current={index === active}
                        >
                            <UImage className='object-cover' src={image} alt='' sizes='64px' />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
