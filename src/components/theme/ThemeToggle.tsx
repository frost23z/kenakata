'use client'

import { cva } from 'class-variance-authority'
import { cn } from 'cn'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'

const track = cva(
    'hover:bg-accent hover:text-accent-foreground lg:border-border lg:bg-muted lg:hover:bg-muted flex h-10 w-10 items-center justify-center rounded-md transition-colors lg:h-8 lg:w-14 lg:justify-start lg:rounded-full lg:border lg:p-1 lg:hover:text-inherit'
)

const knob = cva(
    'lg:bg-background flex items-center justify-center lg:size-6 lg:rounded-full lg:shadow-sm lg:transition-transform lg:duration-200',
    {
        variants: {
            isDark: {
                true: 'lg:translate-x-6',
                false: 'lg:translate-x-0',
            },
        },
        defaultVariants: {
            isDark: false,
        },
    }
)

const emptySubscribe = () => () => {}

function useMounted() {
    return useSyncExternalStore(
        emptySubscribe,
        () => true, // client snapshot
        () => false // server snapshot
    )
}

export default function ThemeToggle({ className = '' }: { className?: string }) {
    const { resolvedTheme, setTheme } = useTheme()
    const mounted = useMounted()

    const isDark = mounted && resolvedTheme === 'dark'

    return (
        <button
            type='button'
            role='switch'
            aria-checked={isDark}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={cn(track(), className)}
        >
            <span className={knob({ isDark })}>
                {mounted ? isDark ? <Moon /> : <Sun /> : <Sun className='opacity-0' />}
            </span>
        </button>
    )
}
