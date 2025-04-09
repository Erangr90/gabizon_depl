import { getCreators } from '@/lib/creators/get'
import { getPostsByDates, getSavedPosts } from '@/lib/posts/db/get'
import FilterPop from '@/lib/posts/FilterPop'
import FilterPopApp from '@/lib/posts/FilterPopApp'
import PostsSection from '@/lib/posts/PostsSection'
import { Creator, Post } from '@prisma/client'
import React from 'react'
import { getUser } from 'zvijude/auth/funcs'

async function page({ params, searchParams }) {
  let { query } = await searchParams
  if (query) query = JSON.parse(query)
  const { id } = await params
  const creators = (await getCreators(id)) as Creator[]

  const posts = (await getPostsByDates(id, query)) as Post[]
  const user = await getUser()
  const savedPosts = await getSavedPosts(user.id)

  return (
    <main className='bg-bg_main_color min-h-screen px-4 md:px-8 pb-32 md:pb-8 pt-20'>
      <h1 className='md:hidden text-3xl font-semibold mb-8 text-center'>ספריית השיעורים</h1>

      <FilterPopApp communityId={id} creators={creators} />
      <PostsSection savedPosts={savedPosts} userId={user.id} communityId={id} initialPosts={posts} />
    </main>
  )
}

export default page
