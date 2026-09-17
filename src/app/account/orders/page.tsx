import OrdersList from '@/components/account/OrdersList'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Your orders',
    robots: { index: false },
}

export default function OrdersPage() {
    return <OrdersList />
}
