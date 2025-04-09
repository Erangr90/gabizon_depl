'use server'

import { db } from '@/db/db'
import { revalidatePath } from 'next/cache'

export async function addPost(post, communityId: string) {
  const creatorId = post.creator
  delete post.creator
  const res = await db.post.create({
    data: {
      ...post,
      creator: { connect: { id: Number(creatorId) } },
      community: { connect: { id: Number(communityId) } },
      date: new Date(post.date),
      endTime: new Date(post.endTime),
    },
  })

  revalidatePath(`/admin/${communityId}/library`)
}

export async function updatePost(post, id, communityId) {
  const creatorId = post.creator
  delete post.creator
  const res = await db.post.update({
    where: {
      id: Number(id),
    },
    data: {
      ...post,
      creator: { connect: { id: Number(creatorId) } },
      community: { connect: { id: Number(communityId) } },
      date: new Date(post.date),
      endTime: new Date(post.endTime),
    },
  })
  revalidatePath(`/admin/${communityId}/library`)
}

export async function deletePost(id, communityId) {
  await db.post.delete({
    where: {
      id: Number(id),
    },
  })
  revalidatePath(`/admin/${communityId}/library`)
}

export async function savePost(post, userId, communityId, isSaved) {
  if (isSaved) {
    await db.saved.delete({
      where: {
        userId_postId: {
          userId: Number(userId),
          postId: Number(post.id),
        },
      },
    })
  } else {
    await db.saved.create({
      data: {
        userId: Number(userId),
        postId: Number(post.id),
      },
    })
  }
  revalidatePath(`/${communityId}/`)
}
