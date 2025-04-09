import { getBonus } from '@/lib/bonuses/db/get'
import BonusComponent from '@/lib/bonuses/BonusComponent'
import { getSavedPosts } from '@/lib/posts/db/get'
import { getUser } from 'zvijude/auth/funcs'

export default async function Page({ params }) {
  const { id, bonusId } = await params
  const bonus = await getBonus(bonusId)
  const user = await getUser()
  const savedPosts = await getSavedPosts(user.id)

  console.log('bonus', bonus)
  console.log('bonus.posts', bonus?.posts)
  console.log('savedPosts', savedPosts)

  if (!bonus) {
    return <div className='h-screen w-full justify-center items-center flex'>הבונוס לא נמצא או שנמחק</div>
  }

  return <BonusComponent bonus={bonus} communityId={id} userId={user.id} savedPosts={savedPosts} />
}
