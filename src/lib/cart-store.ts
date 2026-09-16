const CART_KEY = 'kenakata-cart'
const WISHLIST_KEY = 'kenakata-wishlist'

export type CartSnapshot = {
    items: CartItem[]
    wishlist: WishlistItem[]
    /** False until localStorage has been read, so the UI can avoid flashing an empty cart. */
    ready: boolean
}

const EMPTY: CartSnapshot = { items: [], wishlist: [], ready: false }

let snapshot: CartSnapshot = EMPTY
let loaded = false

const listeners = new Set<() => void>()

function read<T>(key: string): T[] {
    try {
        const raw = window.localStorage.getItem(key)
        return raw ? (JSON.parse(raw) as T[]) : []
    } catch {
        return []
    }
}

function emit() {
    listeners.forEach((listener) => listener())
}

function write(next: CartSnapshot) {
    snapshot = next

    try {
        window.localStorage.setItem(CART_KEY, JSON.stringify(next.items))
        window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(next.wishlist))
    } catch {
        // Private browsing and full quotas both throw here. The in-memory cart
        // still works for the rest of the session, which beats crashing.
    }

    emit()
}

function load() {
    snapshot = {
        items: read<CartItem>(CART_KEY),
        wishlist: read<WishlistItem>(WISHLIST_KEY),
        ready: true,
    }

    emit()
}

function onStorage(event: StorageEvent) {
    if (event.key === CART_KEY || event.key === WISHLIST_KEY) load()
}

/**
 * localStorage is the source of truth, so the cart lives in an external store
 * rather than React state. `useSyncExternalStore` then gives us three things
 * for free: an empty server snapshot (no hydration mismatch), one shared cart
 * across every component that reads it, and cross-tab sync via the storage
 * event — without a context provider wrapping the tree.
 */
export function subscribe(listener: () => void) {
    if (!loaded) {
        loaded = true
        load()
        window.addEventListener('storage', onStorage)
    }

    listeners.add(listener)

    return () => {
        listeners.delete(listener)
    }
}

export function getSnapshot() {
    return snapshot
}

export function getServerSnapshot() {
    return EMPTY
}

export function addItem(item: WishlistItem, quantity = 1) {
    const existing = snapshot.items.find((entry) => entry.id === item.id)

    write({
        ...snapshot,
        items: existing
            ? snapshot.items.map((entry) =>
                  entry.id === item.id ? { ...entry, quantity: entry.quantity + quantity } : entry
              )
            : [...snapshot.items, { ...item, quantity }],
    })
}

export function setItemQuantity(id: number, quantity: number) {
    write({
        ...snapshot,
        items:
            quantity < 1
                ? snapshot.items.filter((entry) => entry.id !== id)
                : snapshot.items.map((entry) => (entry.id === id ? { ...entry, quantity } : entry)),
    })
}

export function removeItem(id: number) {
    write({ ...snapshot, items: snapshot.items.filter((entry) => entry.id !== id) })
}

export function clearCart() {
    write({ ...snapshot, items: [] })
}

export function toggleWishlistItem(item: WishlistItem) {
    const saved = snapshot.wishlist.some((entry) => entry.id === item.id)

    write({
        ...snapshot,
        wishlist: saved
            ? snapshot.wishlist.filter((entry) => entry.id !== item.id)
            : [...snapshot.wishlist, item],
    })
}

/** Test seam — resets module state between test cases. */
export function resetStore() {
    snapshot = EMPTY
    loaded = false
    listeners.clear()
}
