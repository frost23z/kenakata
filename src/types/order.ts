type PaymentMethod = 'cod' | 'bkash' | 'nagad' | 'card'

type OrderStatus = 'placed' | 'packed' | 'shipped' | 'delivered'

type Order = {
    /** `KEN-XXXXXXXX`. Shown to the customer and used as the tracking number. */
    id: string
    /** ISO string — Dates do not survive a JSON round trip through localStorage. */
    placedAt: string
    name: string
    email: string
    phone: string
    address: string
    city: string
    payment: PaymentMethod
    /** A snapshot, not a reference: prices change, a placed order does not. */
    items: CartItem[]
    subtotal: number
    delivery: number
    total: number
}
