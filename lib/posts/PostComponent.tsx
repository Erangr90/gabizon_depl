'use client'

import { useState, useEffect } from 'react'
import Icon from 'zvijude/icon'
import { savePost } from './db/set'
import Link from 'next/link'
import { Btn } from 'zvijude/btns'

export default function PostComponent({ post, communityId, userId, savedPosts }) {
  let isSaved = false

  for (const savedPost of savedPosts) {
    if (savedPost.postId === post.id) {
      isSaved = true
    }
  }

  const now = new Date().getTime()
  const start = new Date(post.date).getTime()
  const end = new Date(post.endTime).getTime()

  const before = now < start
  const after = now > end
  const isLive = now > start && now < end

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

  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  const videoId = getYouTubeVideoId(post.yt) || ''

  function downloadMedia(media, title) {
    if (media && media.length > 0) {
      const link = document.createElement('a')
      link.href = media[0]
      link.target = '_blank' // Open in a new tab
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else {
      alert('No media available to open.')
    }
  }

  return (
    <main className='bg-bg_main_color min-h-screen px-4 md:px-8 pb-32 md:pb-8 pt-20'>
      <Link className='flex gap-2 mb-4' href={`/${communityId}/library`}>
        <Icon name='arrow-right' type='reg' className='size-4' />
        <p className='font-semibold'>חזרה לכל השיעורים</p>
      </Link>
      <div className='max-w-3xl '>
        {after && post.yt && (
          <div className='relative pb-[56.25%] h-0 overflow-hidden rounded-lg mb-4'>
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              className='absolute top-0 left-0 w-full h-full'
              allowFullScreen
              title={post.title}
            />
          </div>
        )}

        {(before || isLive) && post.zoom && (
          <div
            className={`relative pb-[56.25%] bg-gradient-to-r from-cyan-200 to-blue-300 h-0 overflow-hidden ${
              isLive ? 'rounded-t-lg' : 'rounded-lg'
            } `}
          >
            <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
              <a
                href={post.zoom}
                target='_blank'
                rel='noopener noreferrer'
                className='py-4 px-6 flex gap-2 bg-gradient-to-tr text-white font-semibold from-blue-500 to-blue-400 rounded-2xl hover:opacity-90'
              >
                הצטרפות לשיעור בזום
                <Icon name='camera-movie' type='sol' className='size-4 bg-white' />
              </a>
            </div>
          </div>
        )}

        {isLive && (
          <div className='flex rounded-b-lg items-center justify-center font-semibold text-lg w-full bg-red-500 text-white px-4 py-1 no-underline hover:bg-red-600 transition-colors mb-4'>
            <Icon name='tower-broadcast' type='sol' className='size-4 bg-white mr-2' />
            עכשיו בלייב
          </div>
        )}
        <div className=' p-4 rounded-lg  space-y-4'>
          <div className='relative'>
            <div className='pr-10'>
              <h2 className='font-semibold text-xl text-gray-900 mb-1'>{post.title}</h2>
              <p className='text-gray-500 mb-2 font-semibold'>{post.desc}</p>
            </div>
            <button onClick={handleSave} className='absolute top-0 right-0 bg-transparent border-none cursor-pointer'>
              <Icon name='bookmark' type={isSaved ? 'sol' : 'reg'} className='size-5 bg-solid' />
            </button>
          </div>
          <span className='font-semibold bg-soft text-solid px-2 py-1 rounded-lg text-sm'>{post.creator.firstName}</span>
          <div className='flex w-full justify-between gap-1 text-sm'>
            <div className='flex gap-2 items-end w-full text-solid font-semibold'>
              <span>{formattedTime}</span>
              <span>•</span>
              <span>{formattedDate}</span>
              <span>•</span>
              <span>{post.duration} דקות</span>
            </div>
          </div>
        </div>
        {((post.media && before) || (post.media && isLive)) && (
          <div className='max-w-3xl mx-auto mt-4'>
            <Btn
              dir='ltr'
              onClick={() => downloadMedia(post.media, 'קבצי הכנה לשיעור')}
              lbl='הורד קבצי הכנה לשיעור'
              icon='download'
              className='w-full'
            />
          </div>
        )}
        {post.media && after && (
          <div className='max-w-3xl mx-auto mt-4'>
            <Btn
              dir='ltr'
              onClick={() => downloadMedia(post.sum, 'קבצי סיכום שיעור')}
              lbl='הורד קבצי סיכום שיעור'
              icon='download'
              className='w-full'
            />
          </div>
        )}
      </div>
    </main>
  )
}
