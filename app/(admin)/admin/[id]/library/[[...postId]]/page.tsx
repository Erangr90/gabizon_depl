import { getPostById, getPosts } from '@/lib/posts/db/get'
import { Creator, Post } from '@prisma/client'
import PostTable from '@/lib/posts/PostTable'
import Title from 'zvijude/general/Title'
import { getCreators } from '@/lib/creators/get'
import PostPop from '@/lib/posts/PostPop'
import FilterPop from '@/lib/posts/FilterPop'

export default async function LibraryPage({ params, searchParams }) {
  let { filter } = await searchParams
  if (filter) filter = JSON.parse(filter)
  const { id } = await params
  const creators = (await getCreators(id)) as Creator[]
  const posts = (await getPosts(id, filter)) as Post[]

  let post = {} as Post | null
  if (filter?.postId) post = await getPostById(filter.postId)

  return (
    <main className='bg-bg_main_color h-screen p-8'>
      <Title lbl='ספרייה' />
      <FilterPop communityId={id} creators={creators} />
      <PostTable communityId={id} data={posts} key={Math.random()} />

      {filter?.postId && <PostPop creators={creators} communityId={id} post={post} />}
    </main>
  )
}
