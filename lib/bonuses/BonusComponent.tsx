'use client'

import Image from 'next/image'
import Icon from 'zvijude/icon'
import Link from 'next/link'
import PostCard from '../posts/PostCard'

export default function BonusComponent({ bonus, communityId, userId, savedPosts }) {
  return (
    <main className='min-h-screen bg-gradient-to-b from-bg_main_color to-bg_secondary_color pb-20'>
      <div className='relative h-64 md:h-80 w-full mb-8'>
        {bonus.img ? (
          <Image src={bonus.img} alt={bonus.title} layout='fill' objectFit='cover' className='brightness-50' />
        ) : (
          <div className='absolute inset-0 bg-gray-300' />
        )}
        <div className='absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent p-6 md:p-10'>
          <h1 className='text-3xl md:text-4xl font-bold text-white mb-2'>{bonus.title}</h1>
        </div>
      </div>

      <div className=' mx-auto px-4 md:px-8'>
        <Link
          className='inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white bg-opacity-20 rounded-full transition-colors hover:bg-opacity-30'
          href={`/${communityId}/bonuses`}
        >
          <Icon name='arrow-right' type='reg' className='size-4' />
          <span className='font-semibold text-sm'>חזרה לכל הבונוסים</span>
        </Link>

        {bonus.posts.length > 0 ? (
          <>
            <h2 className='text-2xl font-semibold mb-6 px-4 text-gray-800'>שיעורי בונוס</h2>
            <div className='grid grid-cols-1 md:grid-cols-1 gap-6'>
              {bonus.posts.map((post) => (
                <div key={post.id} className='transition-transform duration-300 hover:-translate-y-1'>
                  <PostCard savedPosts={savedPosts} communityId={communityId} userId={userId} post={post} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className='text-center py-12 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-lg'>
            <Icon name='file' type='reg' className='size-16 mx-auto mb-4 text-gray-400' />
            <p className='text-xl font-semibold text-gray-600'>אין שיעורי בונוס זמינים כרגע</p>
            <p className='text-gray-500 mt-2'>בקרוב יתווספו שיעורים חדשים</p>
          </div>
        )}
      </div>
    </main>
  )
}
