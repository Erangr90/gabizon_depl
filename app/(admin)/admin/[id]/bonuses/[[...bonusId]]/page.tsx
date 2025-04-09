import { getPosts, getTitleDescIdPosts } from '@/lib/posts/db/get'
import { getBonusById, getBonuses } from '@/lib/bonuses/db/get'
import BonusPop from '@/lib/bonuses/BonusPop'
import { Post, Bonus } from '@prisma/client'
import Title from 'zvijude/general/Title'
import BonusesTable from '@/lib/bonuses/BonusesTable'
import BonusesSection from '@/lib/bonuses/BonusesSection'

export default async function BonusPage({ params }) {
  const { id, bonusId } = await params
  const posts = await getTitleDescIdPosts(id)
  const bonuses = (await getBonuses(id)) as Bonus[]

  let bonus = {} as Bonus | null
  if (bonusId && bonusId !== '0') bonus = await getBonusById(bonusId)

  return (
    <main className='bg-bg_main_color h-screen p-8'>
      <Title lbl={'בונוסים'} />
      {/* <BonusesTable communityId={id} data={bonuses} key={Math.random()} /> */}
      <BonusesSection communityId={id} bonuses={bonuses} />

      {bonusId && <BonusPop posts={posts} communityId={id} bonus={bonus} />}
    </main>
  )
}
