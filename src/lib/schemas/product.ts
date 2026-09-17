import { z } from 'zod'

/** One image url per line in the textarea; this is the only place that splits it. */
export function toImageList(value: string) {
    return value
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
}

function isUrl(value: string) {
    return URL.canParse(value)
}

export const productSchema = z.object({
    title: z.string().trim().min(3, { message: 'Give the product a title.' }),
    price: z
        .number({ message: 'Enter a price.' })
        .positive({ message: 'Price has to be above zero.' }),
    description: z.string().trim().min(10, { message: 'Write at least a sentence.' }),
    categoryId: z.number({ message: 'Pick a category.' }).int().positive(),
    images: z
        .string()
        .refine((value) => toImageList(value).length > 0, {
            message: 'Add at least one image url.',
        })
        .refine((value) => toImageList(value).length <= 6, {
            message: 'Six images is plenty.',
        })
        .refine((value) => toImageList(value).every(isUrl), {
            message: 'Every image has to be a full url, one per line.',
        }),
})

export type ProductFormValues = z.infer<typeof productSchema>
