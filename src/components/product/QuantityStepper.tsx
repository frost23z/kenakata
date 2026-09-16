'use client'

import { cva } from 'class-variance-authority'
import { cn } from 'cn'
import { Minus, Plus } from 'lucide-react'

const step = cva(
    'hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring flex size-9 items-center justify-center transition-colors focus-visible:ring-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40'
)

type QuantityStepperProps = {
    value: number
    onChange: (value: number) => void
    /** Below this the decrement button is disabled. Pass 0 to let the cart remove the line. */
    min?: number
    max?: number
    label?: string
    className?: string
}

export default function QuantityStepper({
    value,
    onChange,
    min = 1,
    max = 99,
    label = 'Quantity',
    className = '',
}: QuantityStepperProps) {
    return (
        <div
            className={cn(
                'border-border inline-flex items-center overflow-hidden rounded-md border',
                className
            )}
            role='group'
            aria-label={label}
        >
            <button
                className={step()}
                onClick={() => onChange(value - 1)}
                disabled={value <= min}
                type='button'
                aria-label='Decrease quantity'
            >
                <Minus className='size-4' />
            </button>

            <span className='w-10 text-center text-sm font-medium tabular-nums' aria-live='polite'>
                {value}
            </span>

            <button
                className={step()}
                onClick={() => onChange(value + 1)}
                disabled={value >= max}
                type='button'
                aria-label='Increase quantity'
            >
                <Plus className='size-4' />
            </button>
        </div>
    )
}
