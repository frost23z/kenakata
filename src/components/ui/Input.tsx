import { cva } from 'class-variance-authority'
import { cn } from 'cn'
import { useId } from 'react'

export const inputVariants = cva(
    'border-input bg-background focus:border-ring focus:ring-ring/30 h-10 w-full rounded-md border px-3 text-sm transition-colors focus:ring-2 focus:outline-none disabled:opacity-50',
    {
        variants: {
            invalid: {
                true: 'border-destructive focus:border-destructive focus:ring-destructive/30',
                false: '',
            },
        },
        defaultVariants: {
            invalid: false,
        },
    }
)

type FieldProps = {
    label: string
    id?: string
    hint?: string
    error?: string
    children?: React.ReactNode
    wrapperClassName?: string
} & React.ComponentProps<'input'>

/**
 * Wraps a labelled input with its hint/error slot wired up via
 * `aria-describedby`, so every form in the app gets the same accessible
 * structure instead of each one inventing it. Pass `children` to swap the
 * input for a `<select>` or `<textarea>` while keeping the same wrapper —
 * in that case pass an explicit `id` too, since the label points at it and
 * the generated fallback is not handed to the child.
 *
 * `React.ComponentProps<'input'>` rather than `InputHTMLAttributes`: the
 * latter has no `ref`, and react-hook-form's `register()` returns one in the
 * same object as `name`/`onChange`, so `{...register('email')}` would not
 * type-check against it.
 */
export default function Field({
    label,
    id,
    hint,
    error,
    children,
    className = '',
    wrapperClassName = '',
    ...props
}: FieldProps) {
    const generatedId = useId()
    const fieldId = id ?? generatedId
    const hintId = hint ? `${fieldId}-hint` : undefined
    const errorId = error ? `${fieldId}-error` : undefined

    return (
        <div className={cn('space-y-1.5', wrapperClassName)}>
            <label className='text-sm font-medium' htmlFor={fieldId}>
                {label}
            </label>

            {children ?? (
                <input
                    id={fieldId}
                    className={cn(inputVariants({ invalid: Boolean(error) }), className)}
                    aria-invalid={Boolean(error)}
                    aria-describedby={errorId ?? hintId}
                    {...props}
                />
            )}

            {hint && !error && (
                <p id={hintId} className='text-muted-foreground text-xs'>
                    {hint}
                </p>
            )}

            {error && (
                <p id={errorId} className='text-destructive text-xs' role='alert'>
                    {error}
                </p>
            )}
        </div>
    )
}
