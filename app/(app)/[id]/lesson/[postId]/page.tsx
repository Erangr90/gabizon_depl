import { getPostByIdIncludedCreator, getSavedPosts } from '@/lib/posts/db/get'
import PostComponent from '@/lib/posts/PostComponent'
import { getUser } from 'zvijude/auth/funcs'

export default async function Page({ params }) {
  const { id, postId } = await params
  const post = await getPostByIdIncludedCreator(postId)
  const user = await getUser()
  const savedPosts = await getSavedPosts(user.id)

  console.log('savedPosts', savedPosts)
  console.log('my post: ', post)

  if (!post) {
    return <div className='h-screen w-full justify-center items-center flex'>השיעור לא נמצא או שנמחק מהספרייה</div>
  }

  return <PostComponent post={post} communityId={id} userId={user.id} savedPosts={savedPosts} />
}
