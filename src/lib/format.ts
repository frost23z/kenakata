const taka = new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    maximumFractionDigits: 0,
})

export function formatPrice(value: number) {
    return taka.format(value).replace('BDT', '৳').replace(/\s/g, '')
}

export function formatDate(value: string | Date) {
    return new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    }).format(new Date(value))
}

export function titleCase(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1)
}
