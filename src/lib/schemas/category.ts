import { z } from 'zod'

export const categorySchema = z.object({
    name: z.string().trim().min(2, { message: 'Give the category a name.' }),
    image: z
        .string()
        .trim()
        .refine((value) => URL.canParse(value), { message: 'Enter a full image url.' }),
})

export type CategoryFormValues = z.infer<typeof categorySchema>
