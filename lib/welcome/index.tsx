import Link from 'next/link'
import CommunitiesSection from './CommunitiesSection'
import { getComunities } from './db'
import Icon from 'zvijude/icon'

export default function Welcome({ communities }) {
  return (
    <div className="h-screen bg-gray-100">
      <Link
        href="/welcome/create-community"
        className="inline-flex items-center justify-center gap-2 px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full shadow-md hover:from-purple-700 hover:to-indigo-700 "
      >
        צור קהילה
        <Icon name="plus" className=" bg-white" type="sol" />
      </Link>{' '}
      <CommunitiesSection communities={communities} />
    </div>
  )
}
