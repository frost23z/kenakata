import { z } from 'zod'

/**
 * Single source for the payment options: the radio list renders from this and
 * the schema's enum is derived from it, so a new method cannot be added to one
 * without the other. Same reasoning as `SORT_OPTIONS` in `lib/sort.ts`.
 */
export const PAYMENT_OPTIONS: readonly { value: PaymentMethod; label: string; hint: string }[] = [
    { value: 'cod', label: 'Cash on delivery', hint: 'Pay the rider when the parcel arrives' },
    { value: 'bkash', label: 'bKash', hint: 'You will get a payment request on your number' },
    { value: 'nagad', label: 'Nagad', hint: 'You will get a payment request on your number' },
    { value: 'card', label: 'Card', hint: 'Visa, Mastercard or American Express' },
]

const paymentValues = PAYMENT_OPTIONS.map((option) => option.value) as [
    PaymentMethod,
    ...PaymentMethod[],
]

export const checkoutSchema = z.object({
    name: z.string().trim().min(3, { message: 'Enter the full name for the delivery.' }),
    email: z.string().trim().email({ message: 'Enter an email we can send the receipt to.' }),
    // Bangladeshi mobile numbers: 01, then an operator digit 3–9, then eight more.
    phone: z
        .string()
        .trim()
        .regex(/^01[3-9]\d{8}$/, { message: 'Enter an 11-digit number starting 01.' }),
    address: z.string().trim().min(8, { message: 'Enter the house, road and area.' }),
    city: z.string().trim().min(2, { message: 'Enter a city or district.' }),
    payment: z.enum(paymentValues, { message: 'Choose how you want to pay.' }),
})

export type CheckoutValues = z.infer<typeof checkoutSchema>

export function paymentLabel(method: PaymentMethod) {
    return PAYMENT_OPTIONS.find((option) => option.value === method)?.label ?? method
}
