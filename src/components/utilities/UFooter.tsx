import { cn } from 'cn'

export default function UFooter({ children, className = '' }: BaseProps) {
    return <footer className={cn('border-border w-full border-t', className)}>{children}</footer>
}
