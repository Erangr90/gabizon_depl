'use server'
import { db } from '@/db/db'
import { kdb } from '@/db/knex'
import { Talk } from '@prisma/client'

export async function getTalkById(id: string) {
  const sql = `
  SELECT *
  FROM "Talk"
  WHERE id = ?`

  const res = await kdb.raw(sql, id)
  return res.rows[0] || null
}

export async function getTalksByDates(communityId: string) {
  const sql = `
    SELECT t.*
    FROM "Talk" t
    WHERE t."communityId" = ?
    ORDER BY t."date" ASC`

  const res = await kdb.raw(sql, communityId)
  return res.rows
}
