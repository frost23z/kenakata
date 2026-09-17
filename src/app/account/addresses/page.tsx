import StatusPanel from '@/components/ui/StatusPanel'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Saved addresses',
    robots: { index: false },
}

// Nothing stores addresses yet: checkout keeps the order, not the address book.
// Left as an honest empty state rather than faked rows.
export default function AddressesPage() {
    return (
        <StatusPanel
            title='No saved addresses'
            body='Addresses you use at checkout will be saved here so you do not have to type them twice.'
            actionLabel='Go to checkout'
            actionHref='/checkout'
        />
    )
}
