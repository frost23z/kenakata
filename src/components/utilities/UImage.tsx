'use client'

import Image from 'next/image'
import { useState } from 'react'
import { PLACEHOLDER_IMAGE } from './constants'

export default function UImage({
    src,
    alt,
    className = '',
    sizes = '(min-width: 1024px) 25vw, 50vw',
    priority = false,
}: ImageProps) {
    const [failed, setFailed] = useState(false)

    return (
        <Image
            className={className}
            src={failed ? PLACEHOLDER_IMAGE : src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            onError={() => setFailed(true)}
        />
    )
}
