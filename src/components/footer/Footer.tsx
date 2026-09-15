import UContainer from '@/components/utilities/UContainer'
import UFooter from '@/components/utilities/UFooter'

export default function Footer() {
    return (
        <UFooter>
            <UContainer className='flex flex-col items-center justify-center gap-4'>
                <p>&copy; 2026 Kenakata. All rights reserved.</p>
            </UContainer>
        </UFooter>
    )
}
