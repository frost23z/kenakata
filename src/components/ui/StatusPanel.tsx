import Button, { ButtonLink } from './Button'

type StatusPanel = {
    title: string
    body: string
    actionLabel?: string
    actionHref?: string
    actionOnClick?: () => void
}

export default function StatusPanel({
    title,
    body,
    actionLabel,
    actionHref,
    actionOnClick,
}: StatusPanel) {
    return (
        <div className='border-border flex flex-col items-center rounded-xl border border-dashed px-6 py-16 text-center'>
            <h2 className='text-lg font-semibold'>{title}</h2>
            <p className='text-muted-foreground mt-2 max-w-sm text-sm text-pretty'>{body}</p>
            {actionLabel &&
                (actionHref ? (
                    <ButtonLink className='mt-6' href={actionHref}>
                        {actionLabel}
                    </ButtonLink>
                ) : actionOnClick ? (
                    <Button className='mt-6' onClick={actionOnClick}>
                        {actionLabel}
                    </Button>
                ) : null)}
        </div>
    )
}
