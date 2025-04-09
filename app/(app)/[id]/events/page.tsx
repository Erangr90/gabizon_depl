import { db } from '@/db/db'
import { getEvents } from '@/lib/events/db/get'
import { EventCard } from '@/lib/events/EventCard'
import { Event } from '@prisma/client'
import Link from 'next/link'

export default async function page({ params }) {
  const { id } = await params
  const events = await getEvents(id)

  const now = new Date().getTime()
  const pastEvents: Event[] | null = []
  const upcomingEvents: Event[] | null = []

  events.forEach((event) => {
    const eventDate = new Date(event.date).getTime()
    if (eventDate < now) {
      pastEvents.push(event)
    } else {
      upcomingEvents.push(event)
    }
  })

  console.log('events', events)

  return (
    <main className='bg-bg_main_color min-h-screen px-4 md:px-8 pb-32 md:pb-8 pt-20'>
      {/* Upcoming Events */}
      <div className='flex w-full md:max-w-max justify-around'>
        <h1 className='text-2xl font-semibold mb-6 underline'>אירועים קרובים</h1>
        <Link href={`/${id}/events/previous`} className='text-2xl font-semibold mb-6'>
          אירועים שהתקיימו{' '}
        </Link>
      </div>
      {upcomingEvents.length > 0 && (
        <>
          <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </>
      )}

      {/* Past Events */}
      {/* {pastEvents.length > 0 && (
        <>
          <h1 className='text-2xl font-semibold mb-6 mt-12'>אירועים שהתקיימו</h1>
          <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
            {pastEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </>
      )} */}
    </main>
  )
}
