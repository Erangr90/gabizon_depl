'use server'

import { db } from '@/db/db'
import { kdb } from '@/db/knex'
import { revalidatePath } from 'next/cache'

export async function addUser(user, communityId: string) {
  const [id] = await kdb('User')
    .insert({
      ...user,
      community_ids: kdb.raw('ARRAY[?]::INTEGER[]', [communityId]),
    })
    .returning('id')

  revalidatePath(`/admin/${communityId}/users`)
  return id.id as number
}

export async function updateUser(user, id, communityId) {
  const res = await db.user.update({
    where: {
      id: Number(id),
    },
    data: {
      ...user,
      birthday: new Date(user.birthday),
    },
  })
  revalidatePath(`/admin/${communityId}/users`)
}

export async function deleteUser(id, communityId) {
  await db.user.delete({
    where: {
      id: Number(id),
    },
  })
  revalidatePath(`/admin/${communityId}/users`)
}

export async function createAdmin(data) {
  const { birthday } = data
  const res = await db.user.create({
    data: {
      ...data,
      role: 'ADMIN',
      origin: 'אחר',
      status: 'מאומת',
      birthday: new Date(birthday),
    },
  })

  console.log('res: ', res)
  revalidatePath(`/auth`)
}
