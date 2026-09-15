import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'cn'
import Link from 'next/link'

export const buttonVariants = cva(
    'focus-visible:ring-ring inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                primary: 'bg-primary text-primary-foreground shadow-xs hover:opacity-90',
                secondary: 'bg-secondary text-secondary-foreground hover:opacity-90',
                outline:
                    'border-input hover:bg-accent hover:text-accent-foreground border bg-transparent',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                destructive: 'bg-destructive text-destructive-foreground hover:opacity-90',
            },
            size: {
                sm: 'h-8 px-3 text-xs',
                md: 'h-10 px-4 text-sm',
                lg: 'h-12 px-6 text-base',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'md',
        },
    }
)

type ButtonVariantProps = VariantProps<typeof buttonVariants>

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonVariantProps

export default function Button({ variant, size, className, ...props }: ButtonProps) {
    return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
}

type ButtonLinkProps = React.ComponentProps<typeof Link> & ButtonVariantProps

export function ButtonLink({ variant, size, className, ...props }: ButtonLinkProps) {
    return <Link className={cn(buttonVariants({ variant, size }), className)} {...props} />
}
