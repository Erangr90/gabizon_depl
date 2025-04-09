'use server'

import { db } from '@/db/db'
import { revalidatePath } from 'next/cache'

export async function addAdminMsg(adminMsg, communityId: string) {
  const contacts = adminMsg.all ? {} : { users: { connect: adminMsg.users?.map((userId) => ({ id: Number(userId) })) } }

  const res = await db.adminMsg.create({
    data: {
      ...adminMsg,
      community: { connect: { id: Number(communityId) } },
      ...contacts,
    },
  })

  revalidatePath(`/admin/${communityId}/bonuses`)
}

export async function updateAdminMsg(adminMsg, id, communityId) {
  const contacts = adminMsg.all ? {} : { users: { connect: adminMsg.users?.map((userId) => ({ id: Number(userId) })) } }

  await db.adminMsg.update({
    where: {
      id: Number(id),
    },
    data: {
      users: { set: [] },
    },
  })

  const res = await db.adminMsg.update({
    where: {
      id: Number(id),
    },
    data: {
      ...adminMsg,
      community: { connect: { id: Number(communityId) } },
      ...contacts,
    },
  })
  revalidatePath(`/admin/${communityId}/bonuses`)
}

export async function deleteAdminMsg(id, communityId) {
  await db.adminMsg.delete({
    where: {
      id: Number(id),
    },
  })
  revalidatePath(`/admin/${communityId}/bonuses`)
}
