import CartButton from '@/components/header/CartButton'
import Logo from '@/components/logo/Logo'
import ThemeToggle from '@/components/theme/ThemeToggle'
import UContainer from '@/components/utilities/UContainer'
import UHeader from '@/components/utilities/UHeader'
import { Heart, User } from 'lucide-react'
import Link from 'next/link'

export default async function Header() {
    return (
        <UHeader className='flex items-center'>
            <UContainer className='flex items-center justify-between gap-2 lg:gap-4'>
                <Link className='flex shrink-0' href='/' aria-label='Kenakata Home'>
                    <Logo className='text-foreground w-40 lg:w-50' />
                </Link>

                <div className='ms-auto flex items-center gap-2 lg:ms-0 lg:gap-4'>
                    <ThemeToggle />
                    <Link
                        className='hover:bg-accent hover:text-accent-foreground hidden size-10 items-center justify-center rounded-md transition-colors sm:flex'
                        href='/wishlist'
                        aria-label='Wishlist'
                    >
                        <Heart />
                    </Link>
                    <Link
                        className='hover:bg-accent hover:text-accent-foreground flex h-10 items-center gap-2 rounded-md px-2 transition-colors'
                        href='/account'
                    >
                        <User />
                        <span className='hidden text-sm font-medium lg:inline'>Account</span>
                    </Link>
                    <CartButton />
                </div>
            </UContainer>
        </UHeader>
    )
}
