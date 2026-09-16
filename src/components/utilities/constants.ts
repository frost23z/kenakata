import { Phone, RotateCcw, ShieldCheck, Truck } from 'lucide-react'

export const CONTAINER_CLASS = 'container mx-auto px-4'

export const SITE_NAME = 'Kenakata'

export const PLACEHOLDER_IMAGE = '/placeholder.svg'

export const GUARANTEES = [
    { Icon: Truck, title: 'Nationwide delivery', body: '1-2 days in Dhaka, 2-4 days outside' },
    { Icon: RotateCcw, title: '7-day returns', body: 'Unused items, original packaging' },
    { Icon: ShieldCheck, title: 'Secure checkout', body: 'bKash, Nagad, card or cash on delivery' },
    { Icon: Phone, title: 'Support 9am-9pm', body: 'Call 09612-345678 or chat with us' },
] as const

export const FOOTER_NAV: readonly NavColumn[] = [
    {
        heading: 'Shop',
        links: [
            { label: 'All categories', href: '/category' },
            { label: 'New arrivals', href: '/new' },
            { label: 'Best sellers', href: '/best-sellers' },
            { label: 'Deals under ৳500', href: '/offers/under-500' },
        ],
    },
    {
        heading: 'Your account',
        links: [
            { label: 'Sign in', href: '/login' },
            { label: 'Orders', href: '/account/orders' },
            { label: 'Wishlist', href: '//wishlist' },
            { label: 'Track a parcel', href: '/track' },
        ],
    },
    {
        heading: 'Help',
        links: [
            { label: 'Delivery & charges', href: '/help/delivery' },
            { label: 'Returns & refunds', href: '/help/returns' },
            { label: 'Payment methods', href: '/help/payments' },
            { label: 'Contact us', href: '/contact' },
        ],
    },
    {
        heading: 'Kenakata',
        links: [
            { label: 'About us', href: '/about' },
            { label: 'Careers', href: '/careers' },
            { label: 'Privacy policy', href: '/privacy' },
            { label: 'Terms of service', href: '/terms' },
        ],
    },
]

export const PAYMENT_METHODS = [
    'bKash',
    'Nagad',
    'Rocket',
    'Visa',
    'Mastercard',
    'Cash on delivery',
] as const

export const SOCIAL_LINKS = [
    { label: 'Facebook', href: 'https://facebook.com' },
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'YouTube', href: 'https://youtube.com' },
] as const

export const DELIVERY_FEE = 60

export const FREE_DELIVERY_THRESHOLD = 2000
