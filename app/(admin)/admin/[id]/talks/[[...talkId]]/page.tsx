import { getTalkById, getTalksByDates } from '@/lib/talks/db/get'
import TalkPop from '@/lib/talks/TalkPop'
import TalksTable from '@/lib/talks/TalksTable'
import { Talk } from '@prisma/client'
import Title from 'zvijude/general/Title'

export default async function TalksPage({ params }) {
  const { id, talkId } = await params
  const talks = (await getTalksByDates(id)) as Talk[]

  let talk = {} as Talk | null
  if (talkId && talkId !== '0') talk = await getTalkById(talkId)

  return (
    <main className='bg-bg_main_color h-screen p-8'>
      {talkId}
      <Title lbl={'מרחב קהילתי'} />
      <TalksTable communityId={id} data={talks} key={Math.random()} />

      {talkId && <TalkPop communityId={id} talk={talk} />}
    </main>
  )
}
