import CreateCommunity from '@/lib/welcome/CreateComunity'
import Link from 'next/link'
import Icon from 'zvijude/icon'

export default function Page() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-6xl mx-auto px-4 py-12'>
        <header className='mb-8'>
          <Link
            href='/'
            className='inline-flex items-center justify-center gap-2 px-6 py-3 text-lg font-semibold text-white transition-all duration-300 bg-gradient-to-r bg-gradient-to-r from-solid to-solid/80 rounded-full shadow-lg hover:shadow-xl hover:scale-105'
          >
            <Icon name='arrow-right' className='bg-white' type='sol' />
            חזרה לקהילות
          </Link>
        </header>

        <h1 className='text-3xl font-bold text-gray-800 mb-6 text-center'>יצירת קהילה חדשה</h1>

        <CreateCommunity community={null} />
      </div>
    </div>
  )
}
