'use server'

import { User } from '@prisma/client'
import { db } from '../db'

export async function getUsers(): Promise<User[]> {
  return await db.user.findMany()
}

export async function getPosts() {
  return await db.post.findMany()
}
