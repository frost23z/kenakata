import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import ThemeProvider from '@/components/theme/ThemeProvider'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'Kenakata.com',
    description: 'Welcome to Kenakata.com',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
    return (
        <html
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
            lang='en'
            suppressHydrationWarning
        >
            <body className='flex min-h-full w-full flex-col'>
                <ThemeProvider>
                    <Header />
                    {children}
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    )
}
