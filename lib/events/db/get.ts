'use server'
import { Post, Event } from '@prisma/client'
import { db } from '../../../db/db'
import { kdb } from '@/db/knex'

export async function getEvents(communityId: string) {
  const sql = `
    SELECT e.*
    FROM "Event" e
    WHERE e."communityId" = ?
    ORDER BY e."updatedAt" DESC`

  const res = await kdb.raw(sql, communityId)
  return res.rows
}

export async function getEventById(id: string) {
  const sql = `
    SELECT *
    FROM "Event"
    WHERE id = ?`

  const res = await kdb.raw(sql, id)
  return res.rows[0] || null
}
