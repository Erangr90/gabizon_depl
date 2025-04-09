'use client'
import Link from 'next/link'

function SimplePostCard({ post }) {
  return (
    <div className='bg-gray-100 rounded-lg p-4  mb-3 '>
      <h3 className='font-semibold text-xl text-gray-900 mb-2'>{post.title}</h3>
      <div className='flex justify-between items-center'>
        <span className='font-semibold bg-soft text-solid px-2 py-1 rounded-lg text-sm'>{post.creator.firstName}</span>
        <span className='text-sm text-solid font-semibold'>{post.duration} דקות</span>
      </div>
    </div>
  )
}

export function BonusCard({ bonus, communityId }) {
  return (
    <Link href={`/${communityId}/bonuses/${bonus.id}`} className='block'>
      <div className='w-full overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white cursor-pointer'>
        <div className='relative'>
          <img src={bonus.img} alt={bonus.title} className='w-full h-48 object-cover' />
        </div>
        <div className='p-4'>
          <h2 className='text-2xl font-semibold mb-4 text-gray-800'>{bonus.title}</h2>
          <div className='max-h-60 overflow-y-auto' style={{ scrollbarWidth: 'thin' }}>
            {bonus.posts && bonus.posts.map((post) => <SimplePostCard key={post.id} post={post} />)}
          </div>
        </div>
      </div>
    </Link>
  )
}
