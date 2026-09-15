import { cn } from 'cn'

export default function UHeader({ children, className = '' }: BaseProps) {
    return (
        <header
            className={cn(
                'bg-background/85 border-border sticky top-0 z-10 min-h-16 w-full border-b backdrop-blur lg:min-h-20',
                className
            )}
        >
            {children}
        </header>
    )
}
