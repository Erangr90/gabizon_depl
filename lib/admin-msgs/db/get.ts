'use server'

import { kdb } from '@/db/knex'

export async function getAdminMsgs(communityId: string) {
  const sql = `
    SELECT e.*
    FROM "AdminMsg" e
    WHERE e."communityId" = ?
    ORDER BY e."updatedAt" DESC`

  const res = await kdb.raw(sql, communityId)
  return res.rows
}

export async function getAdminMsgById(id: string) {
  const sql = `
    SELECT *
    FROM "AdminMsg"
    WHERE id = ?`

  const res = await kdb.raw(sql, id)
  return res.rows[0] || null
}
