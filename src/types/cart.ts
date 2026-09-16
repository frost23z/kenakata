type CartItem = {
    id: number
    slug: string
    title: string
    price: number
    image: string
    quantity: number
}

type WishlistItem = Omit<CartItem, 'quantity'>
