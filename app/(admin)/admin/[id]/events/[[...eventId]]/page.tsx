import { getEventById, getEvents } from '@/lib/events/db/get'
import EventPop from '@/lib/events/EventPop'
import EventsTable from '@/lib/events/EventsTable'
import { Event } from '@prisma/client'
import Title from 'zvijude/general/Title'

export default async function EventsPage({ params }) {
  const { id, eventId } = await params
  const events = (await getEvents(id)) as Event[]

  let event = {} as Event | null
  if (eventId && eventId !== '0') event = await getEventById(eventId)
  return (
    <main className='bg-bg_main_color h-screen p-8'>
      <Title lbl={'אירועים'} />
      <EventsTable data={events} communityId={id} />
      {eventId && <EventPop communityId={id} event={event} />}
    </main>
  )
}
