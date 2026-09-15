const taka = new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    maximumFractionDigits: 0,
})

export function formatPrice(value: number) {
    return taka.format(value).replace('BDT', '৳').replace(/\s/g, '')
}
