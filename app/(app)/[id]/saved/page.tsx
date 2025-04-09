import { getPosts, getSavedPosts } from '@/lib/posts/db/get'
import PostCard from '@/lib/posts/PostCard'
import PostsSection from '@/lib/posts/PostsSection'
import { Post } from '@prisma/client'
import React from 'react'
import { getUser } from 'zvijude/auth/funcs'

async function page({ params }) {
  const { id } = await params
  const posts = (await getPosts(id, [])) as Post[]
  const user = await getUser()
  const savedPosts = await getSavedPosts(user.id)
  const filteredPosts = [] as Post[]
  for (const savedPost of savedPosts) {
    for (const post of posts) {
      if (post.id === savedPost.postId) {
        filteredPosts.push(post)
      }
    }
  }

  return (
    <main className='bg-bg_main_color h-screen px-4 md:px-8 pb-32 md:pb-8 pt-20'>
      <h1 className='md:hidden text-3xl font-semibold mb-8 text-center'>שיעורים ששמרתי</h1>
      <div className='gap-4 grid grid-cols-1'>
        {filteredPosts.map((post) => (
          <PostCard savedPosts={savedPosts} communityId={id} userId={user.id} key={post.id} post={post} />
        ))}
      </div>
    </main>
  )
}

export default page
