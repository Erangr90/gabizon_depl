'use server'

import { db } from '@/db/db'
import { revalidatePath } from 'next/cache'

export async function deleteBonus(id, communityId) {
  await db.bonus.delete({
    where: {
      id: Number(id),
      communityId: Number(communityId),
    },
  })

  revalidatePath(`/admin/${communityId}/bonuses`)
}

export async function addBonus(data, communityId) {
  const postsIds = data.posts
  delete data.posts

  const res = await db.bonus.create({
    data: {
      ...data,
      communityId: Number(communityId),
      posts: {
        connect: postsIds?.map((id) => ({ id: Number(id) })),
      },
    },
  })
  revalidatePath(`/admin/${communityId}/bonuses`)

  return res ? true : false
}

export async function updateBonus(data, id, communityId) {
  const postsIds = data.posts
  delete data.posts

  const res = await db.bonus.update({
    where: {
      id: Number(id),
      communityId: Number(communityId),
    },
    data: {
      ...data,
      posts: {
        set: postsIds?.map((postId) => ({ id: Number(postId) })),
      },
    },
  })
  revalidatePath(`/admin/${communityId}/bonuses`)

  return res ? true : false
}
