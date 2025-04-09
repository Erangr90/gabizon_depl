import { getTalksByDates } from '@/lib/talks/db/get'
import React from 'react'
import { Talk } from '@prisma/client'
import TalkCard from '@/lib/talks/TalkCard'

export default async function page({ params }) {
  const { id } = await params
  const talks = await getTalksByDates(id)

  const now = new Date().getTime()

  let nextTalk: Talk | null = null
  const upcomingTalks: Talk[] = []
  const pastTalks: Talk[] = []
  const liveTalks: Talk[] = []

  talks.forEach((talk) => {
    const start = new Date(talk.date).getTime()
    const end = new Date(talk.endTime).getTime()

    if (now > start && now < end) {
      liveTalks.push(talk)
    } else if (now > end) {
      pastTalks.push(talk)
    } else if (!nextTalk) {
      nextTalk = talk
    } else {
      upcomingTalks.push(talk)
    }
  })

  return (
    <main className='bg-bg_main_color space-y-8 min-h-screen px-4 md:px-8 pb-32 md:pb-8 pt-20'>
      {/* Live Talks */}
      {liveTalks.length > 0 && (
        <>
          <h1 className='text-3xl font-semibold mb-12'>דיונים בלייב</h1>
          <div className='gap-4 grid grid-cols-1'>
            {liveTalks.map((talk) => (
              <TalkCard key={talk.id} talk={talk} />
            ))}
          </div>
        </>
      )}

      {/* Next Talk */}
      {nextTalk && (
        <>
          <h1 className='text-2xl font-semibold '>הדיון הקרוב</h1>
          <TalkCard talk={nextTalk} />
        </>
      )}

      {/* Upcoming Talks */}
      {upcomingTalks.length > 0 && (
        <>
          <h1 className='text-2xl font-semibold '>דיונים עתידיים נוספים</h1>
          <div className='gap-4 grid grid-cols-1'>
            {upcomingTalks.map((talk) => (
              <TalkCard key={talk.id} talk={talk} />
            ))}
          </div>
        </>
      )}

      {/* Past Talks */}
      {pastTalks.length > 0 && (
        <>
          <h1 className='text-2xl font-semibold mb-6 '>דיונים אחרונים</h1>
          <div className='gap-4 grid grid-cols-1'>
            {pastTalks.map((talk) => (
              <TalkCard key={talk.id} talk={talk} />
            ))}
          </div>
        </>
      )}
    </main>
  )
}
