import { TimeBasedHero } from '@/components/TimeBasedHero'
import { getSavedPosts, homeGetPostsByDates } from '@/lib/posts/db/get'
import PostCard from '@/lib/posts/PostCard'
import { Post } from '@prisma/client'
import React from 'react'
import { getUser } from 'zvijude/auth/funcs'

async function page({ params }) {
  const { id } = await params
  const user = await getUser()
  const posts = (await homeGetPostsByDates(id, [])) as Post[]

  const now = new Date().getTime()

  let nextPost = null as Post | null
  const pastPosts: Post[] = []
  posts.forEach((post) => {
    const end = new Date(post.endTime).getTime()

    if (now > end) {
      pastPosts.push(post)
    } else if (!nextPost) {
      nextPost = post
    }
  })

  const savedPosts = await getSavedPosts(user.id)

  return (
    <main className='bg-bg_main_color min-h-screen pt-16 pb-32 md:pb-0'>
      <TimeBasedHero name={user.name} />
      <div className='px-4 md:px-8 md:pb-8 pt-8 md:pt-8'>
        <div className='mb-6 px-4'>
          <h1 className='text-2xl font-semibold mb-2'>השיעור הקרוב</h1>
          {nextPost ? (
            <div className='gap-4 grid grid-cols-1'>
              <PostCard live={true} savedPosts={savedPosts} communityId={id} userId={user.id} key={nextPost.id} post={nextPost} />
            </div>
          ) : (
            <p className='text-gray-600'>אין שיעור קרוב</p>
          )}
        </div>

        {/* Past Posts */}
        <div className='mt-12 px-4'>
          <h1 className='text-2xl font-semibold mb-6'>שיעורים קודמים</h1>
          {pastPosts.length > 0 ? (
            <div className='gap-4 grid grid-cols-1'>
              {pastPosts.map((post) => (
                <PostCard savedPosts={savedPosts} communityId={id} userId={user.id} key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p className='text-gray-600'>אין שיעורים קודמים</p>
          )}
        </div>
      </div>
    </main>
  )
}

export default page
