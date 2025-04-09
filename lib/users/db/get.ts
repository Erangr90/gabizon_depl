'use server'
import { User } from '@prisma/client'
//import { db } from '@/db/db'
import { kdb } from '@/db/knex'

export async function getUsers(communityId: string, filter): Promise<User[]> {
  const params = [communityId]
  let sql = `
    SELECT u.*
    FROM "User" u
    INNER JOIN "_CommunityToUser" cu ON u.id = cu."B"
    WHERE cu."A" = ?`

  if (filter?.createdAt) {
    sql += ` AND u."createdAt" >= ?`
    params.push(filter.createdAt)
  }
  if (filter?.age) {
    sql += ` AND u."age" >= ?`
    params.push(filter.age)
  }
  if (filter?.origin) {
    sql += ` AND u.origin = ?`
    params.push(filter.origin)
  }
  if (filter?.status) {
    sql += ` AND u.status = ?`
    params.push(filter.status)
  }

  sql += ` ORDER BY u."createdAt" DESC`

  const res = await kdb.raw(sql, params)
  return res.rows
}

export async function getUserById(id: string) {
  const sql = `
    SELECT * 
    FROM "User"
    WHERE id = ?`

  const res = await kdb.raw(sql, id)
  return res.rows[0] || null
}
