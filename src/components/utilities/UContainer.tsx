import { cn } from 'cn'
import { CONTAINER_CLASS } from './constants'

export default function UContainer({ children, className = '' }: BaseProps) {
    return <div className={cn(CONTAINER_CLASS, className)}>{children}</div>
}
