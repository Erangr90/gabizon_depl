'use server'

import { db } from '@/db/db'
import { revalidatePath } from 'next/cache'

export async function addUserMsg(data, communityId: string, userId) {
  const res = await db.userMsg.create({
    data: {
      ...data,
      userId: Number(userId),
    },
  })

  revalidatePath(`/${communityId}/user-msgs`)

  return res ? 'success' : 'failed'
}

export async function updateUserMsg(data, id, communityId: string) {
  await db.userMsg.update({
    where: {
      id: Number(id),
    },
    data: {
      ...data,
    },
  })
  revalidatePath(`/admin/${communityId}/user-msgs`)
}

export async function deleteUserMsg(id, communityId) {
  await db.userMsg.delete({
    where: {
      id: Number(id),
    },
  })
  revalidatePath(`/admin/${communityId}/user-msgs`)
}
