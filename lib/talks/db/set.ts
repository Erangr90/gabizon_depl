'use server'

import { db } from '@/db/db'
import { revalidatePath } from 'next/cache'

export async function addTalk(talk, communityId: string) {
  const { date, endTime } = talk
  const res = await db.talk.create({
    data: {
      ...talk,
      community: { connect: { id: Number(communityId) } },
      date: new Date(date),
      endTime: new Date(endTime),
    },
  })

  revalidatePath(`/admin/${communityId}/talks`)
}

export async function updateTalk(talk, id, communityId) {
  const { date, endTime } = talk
  const res = await db.talk.update({
    where: {
      id: Number(id),
    },
    data: {
      ...talk,
      community: { connect: { id: Number(communityId) } },
      date: new Date(date),
      endTime: new Date(endTime),
    },
  })
  revalidatePath(`/admin/${communityId}/talks`)
}

export async function deleteTalk(id, communityId) {
  await db.talk.delete({
    where: {
      id: Number(id),
    },
  })
  revalidatePath(`/admin/${communityId}/talks`)
}
