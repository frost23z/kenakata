'use client'

import StatusPanel from '@/components/ui/StatusPanel'
import UMain from '@/components/utilities/UMain'

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
    return (
        <UMain className='flex flex-col justify-center gap-6 py-10 lg:gap-10 lg:py-20'>
            <StatusPanel
                title='Something went wrong loading this page'
                body='The service may be busy. Trying again usually works.'
                actionLabel='Try again'
                actionOnClick={reset}
            />
        </UMain>
    )
}
