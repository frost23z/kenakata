import StatusPanel from '@/components/ui/StatusPanel'
import UMain from '@/components/utilities/UMain'

export default function NotFound() {
    return (
        <UMain className='flex flex-col justify-center gap-6 py-10 lg:gap-10 lg:py-20'>
            <StatusPanel
                title='That page does not exist'
                body='The link may be out of date, or the product may have been delisted. The catalogue is a good place to pick up from.'
                actionLabel='Browse categories'
                actionHref='/category'
            />
        </UMain>
    )
}
