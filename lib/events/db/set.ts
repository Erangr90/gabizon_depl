'use server'
import { db } from '@/db/db'
import { revalidatePath } from 'next/cache'

export async function addEvent(event, communityId: string) {
  const { date, endTime } = event
  const res = await db.event.create({
    data: {
      ...event,
      communityId: Number(communityId),
      date: new Date(date),
      endTime: new Date(endTime),
    },
  })

  revalidatePath(`/admin/${communityId}/events`)
}

export async function updateEvent(event, id, communityId: string) {
  console.log('event', event)
  const { date, endTime } = event
  if (!event.payLink) event.payLink = null
  const res = await db.event.update({
    where: {
      id: Number(id),
    },
    data: {
      ...event,
      communityId: Number(communityId),
      date: new Date(date),
      endTime: new Date(endTime),
    },
  })

  console.log('res', res)

  revalidatePath(`/admin/${communityId}/events`)
}

export async function deleteEvent(id: string, communityId: any) {
  await db.event.delete({
    where: {
      id: Number(id),
    },
  })

  revalidatePath(`/admin/${communityId}/events`)
}
