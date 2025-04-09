'use server'
//import { db } from '@/db/db'
import { kdb } from '@/db/knex'
import { UserMsg } from '@prisma/client'

export async function getUserMsgs(): Promise<UserMsg[]> {
  const sql = `
    SELECT *
    FROM "UserMsg" 
    ORDER BY "updatedAt" DESC`

  const res = await kdb.raw(sql)
  return res.rows
}

export async function getUserMsgById(id: string) {
  const sql = `
    SELECT *
    FROM "UserMsg"
    WHERE id = ?`

  const res = await kdb.raw(sql, id)
  return res.rows[0] || null

  // return await db.userMsg.findUnique({
  //   where: {
  //     id: Number(id),
  //   },
  // })
}

export async function getUserMsgsByUserId(userId: string) {
  const sql = `
  SELECT *
  FROM "UserMsg"
  WHERE "userId" = ?
  ORDER BY "updatedAt" DESC`

  const res = await kdb.raw(sql, userId)
  return res.rows
  // return await db.userMsg.findMany({
  //   where: {
  //     userId: Number(userId),
  //   },
  //   orderBy: {
  //     updatedAt: 'desc',
  //   },
  // })
}
