import { cn } from 'cn'
import { CONTAINER_CLASS } from './constants'

export default function UMain({ children, className = '' }: BaseProps) {
    return <main className={cn(`${CONTAINER_CLASS} grow`, className)}>{children}</main>
}
