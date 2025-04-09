'use client'

import Icon from 'zvijude/icon'
import { savePost } from './db/set'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function PostCard({ post, communityId, userId, savedPosts, live = false }) {
  let isSaved = false

  for (const savedPost of savedPosts) {
    if (savedPost.postId === post.id) {
      isSaved = true
    }
  }
  const now = new Date().getTime()
  const start = new Date(post.date).getTime()
  const end = new Date(post.endTime).getTime()
  let isLive = now > start && now < end

  if (live) isLive = live

  const formattedDate = new Date(post.date).toLocaleDateString('he-IL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const formattedTime = new Date(post.date).toLocaleTimeString('he-IL', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  async function handleSave() {
    await savePost(post, userId, communityId, isSaved)
  }

  const router = useRouter()

  function handleCardClick() {
    router.push(`/${communityId}/lesson/${post.id}`)
  }

  return (
    <div onClick={handleCardClick} className='max-w-3xl relative'>
      <div className='bg-white rounded-lg p-4 shadow-lg flex flex-col items-start gap-4 cursor-pointer relative overflow-hidden'>
        {!isLive ? (
          <div className='w-full'>
            <div className='flex justify-between items-start mt-2'>
              <div>
                <h2 className='font-semibold text-xl text-gray-900 mb-1'>{post.title}</h2>
                <p className='text-gray-500 mb-2 font-semibold hidden md:block'>{post.desc}</p>
              </div>
              <button
                onClick={(event) => {
                  event.stopPropagation() // Prevent click event propagation
                  handleSave()
                }}
                className='absolute left-4 top-4 z-10'
              >
                <Icon name='bookmark' type={isSaved ? 'sol' : 'reg'} className='size-5 bg-solid' />
              </button>
            </div>
            <span className='font-semibold bg-soft text-solid px-2 py-1 rounded-lg text-sm'>{post.creator.firstName}</span>
            <div className='flex text-sm mt-2 w-full justify-between gap-2'>
              <div className='flex gap-2 items-end text-solid font-semibold'>
                <span>{formattedTime}</span>
                <span>•</span>
                <span>{formattedDate}</span>
                <span>•</span>
                <span>{post.duration} דקות</span>
              </div>
            </div>
          </div>
        ) : (
          <div className='w-full'>
            <div className='justify-between items-center w-full flex'>
              <div>
                <h2 className='font-semibold text-xl text-gray-900 mb-1'>{post.title}</h2>
                <div className='flex text-sm mt-2 w-full justify-between gap-2'>
                  <div className='flex gap-2 items-end text-solid font-semibold'>
                    <span>{formattedTime}</span>
                    <span>•</span>
                    <span>{formattedDate}</span>
                    <span>•</span>
                    <span>{post.duration} דקות</span>
                  </div>
                </div>
              </div>
              <button
                onClick={(event) => {
                  event.stopPropagation()
                  window.open(post.zoom, '_blank', 'noopener,noreferrer')
                }}
                className='absolute bg-red-500 hover:bg-red-600 duration-200 flex rounded-lg text-white font-semibold px-2 py-1 left-4 top-4'
              >
                <Icon name='tower-broadcast' type='sol' className='size-4 bg-white mr-2' />
                עכשיו
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
