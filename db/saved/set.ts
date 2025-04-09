import { User, Post } from '@prisma/client'
import { db } from '../db'

export async function setSaved(user: User, post: Post) {
  const record = await db.saved.findUnique({
    where: {
      userId_postId: {
        userId: user.id,
        postId: post.id,
      },
    },
  })

  if (!record) {
    await db.saved.create({
      data: {
        user: { connect: { id: user.id } },
        post: { connect: { id: post.id } },
      },
    })
    return true
  }

  return false
}
