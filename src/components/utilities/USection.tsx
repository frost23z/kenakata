import { cn } from 'cn'
import Link from 'next/link'

type USectionProps = {
    children: React.ReactNode
    className?: string
    title: string
    body?: string
    linkLabel?: string
    linkHref?: string
}

export default function USection({
    children,
    className = '',
    title,
    body,
    linkLabel,
    linkHref,
}: USectionProps) {
    return (
        <section className={cn(className)}>
            <div className='mb-6 flex items-end justify-between gap-4'>
                <div>
                    <h2 className='text-xl font-semibold tracking-tight sm:text-2xl'>{title}</h2>
                    {body && <p className='text-muted-foreground mt-1 text-sm'>{body}</p>}
                </div>
                {linkLabel && linkHref && (
                    <Link className='text-primary shrink-0 text-sm font-medium' href={linkHref}>
                        {linkLabel}
                    </Link>
                )}
            </div>
            {children}
        </section>
    )
}
