'use client'

import React, { useState, useMemo } from 'react'
import { Post } from '@prisma/client'
import PostCard from '@/lib/posts/PostCard'
import { Btn } from 'zvijude/btns'

export default function PostsSection({ initialPosts, communityId, userId, savedPosts }) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPosts = useMemo(() => {
    const searchLower = searchQuery.toLowerCase().trim()
    return initialPosts.filter((post) => {
      const titleWords = post.title.toLowerCase().split(' ')
      return (
        titleWords.some((word) => word.includes(searchLower)) ||
        post.desc.toLowerCase().includes(searchLower) ||
        formatDate(post.date).includes(searchQuery) ||
        post.creator.firstName.toLowerCase().includes(searchLower)
      )
    })
  }, [initialPosts, searchQuery])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  return (
    <section className='mx-auto '>
      <div className='mb-6 flex'>
        <input
          type='text'
          placeholder='חיפוש חופשי'
          value={searchQuery}
          onChange={handleSearch}
          className='w-full md:max-w-lg p-3 border border-gray-300 rounded-md shadow-sm'
          aria-label='חיפוש פוסטים'
        />
        <Btn lbl='סינון' icon='filter' clr='text' popoverTarget='filterPosts' />
      </div>
      {filteredPosts.length === 0 ? (
        <p className='text-center md:text-right text-gray-500 py-8'>לא נמצאו פוסטים התואמים את החיפוש שלך.</p>
      ) : (
        <div className='gap-4 grid grid-cols-1'>
          {filteredPosts.map((post) => (
            <PostCard savedPosts={savedPosts} userId={userId} communityId={communityId} key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  )
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
