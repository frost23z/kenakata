const ORDERS_KEY = 'kenakata-orders'

/** How many past orders to keep on the device. Enough for /track, not a database. */
const KEEP = 10

// No 0/O/1/I — order numbers get read down a phone line and written on boxes.
const ALPHABET = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'

/**
 * `KEN-` plus eight random characters. The demo used the last eight digits of
 * `Date.now()`, which collides for two orders placed in the same second, is
 * trivially guessable by anyone who knows roughly when you ordered, and leaks
 * the timestamp. 32 is a factor of 256, so the modulo here stays uniform.
 */
export function createOrderId() {
    const bytes = new Uint8Array(8)
    crypto.getRandomValues(bytes)

    return `KEN-${Array.from(bytes, (byte) => ALPHABET[byte % ALPHABET.length]).join('')}`
}

let snapshot: Order[] | null = null
let loaded = false

const listeners = new Set<() => void>()

function emit() {
    listeners.forEach((listener) => listener())
}

function load() {
    try {
        const raw = window.localStorage.getItem(ORDERS_KEY)
        snapshot = raw ? (JSON.parse(raw) as Order[]) : []
    } catch {
        snapshot = []
    }

    emit()
}

function onStorage(event: StorageEvent) {
    if (event.key === ORDERS_KEY) load()
}

export function subscribeOrders(listener: () => void) {
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

export function getOrdersSnapshot() {
    return snapshot
}

export function getServerOrdersSnapshot(): Order[] | null {
    return null
}

/** For non-React callers. Prefers the cached snapshot, falls back to a read. */
export function readOrders(): Order[] {
    if (snapshot) return snapshot
    if (typeof window === 'undefined') return []

    try {
        const raw = window.localStorage.getItem(ORDERS_KEY)
        return raw ? (JSON.parse(raw) as Order[]) : []
    } catch {
        return []
    }
}

export function saveOrder(order: Order) {
    const next = [order, ...readOrders().filter((entry) => entry.id !== order.id)].slice(0, KEEP)

    try {
        window.localStorage.setItem(ORDERS_KEY, JSON.stringify(next))
    } catch {
        // Private browsing and full quotas both throw. The confirmation panel
        // still shows the order id; only the /track lookup is lost.
    }

    // Snapshot updates even if the write failed, so the current session stays
    // consistent with what the customer was just shown.
    snapshot = next
    emit()
}

export function findOrder(id: string): Order | null {
    return matchOrder(readOrders(), id)
}

/**
 * Split out so components can match against a snapshot they already hold:
 * the result is a reference into that array, stable between renders.
 */
export function matchOrder(orders: Order[], id: string): Order | null {
    const wanted = id.trim().toUpperCase()

    return orders.find((order) => order.id.toUpperCase() === wanted) ?? null
}

/**
 * Mock progression so /track has something to show: one stage per elapsed day,
 * capped at delivered. Replace the whole function when a courier API exists.
 */
export function orderStatus(order: Order): OrderStatus {
    const days = Math.floor((Date.now() - new Date(order.placedAt).getTime()) / 86_400_000)
    const stages: OrderStatus[] = ['placed', 'packed', 'shipped', 'delivered']

    return stages[Math.min(days, stages.length - 1)]
}
