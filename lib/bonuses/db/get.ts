'use server'

import { kdb } from '@/db/knex'
import { Bonus } from '@prisma/client'

export async function getBonuses(communityId: string) {
  const res = await kdb.raw(`SELECT * FROM get_bonus_posts(${communityId})`)
  return res.rows
}

export async function getBonus(bonusId: string) {
  const res = await kdb.raw(`SELECT * FROM get_bonus_posts(8, ${bonusId})`)
  return res.rows[0]
}

export async function getBonusById(id: string) {
  const bonusSQL = `
    SELECT b.*,
    json_agg(
      json_build_object(
        'id', p.id,
        'title', p.title,
        'desc', p.desc
      )
    ) FILTER (WHERE p.id IS NOT NULL) as posts
    FROM "Bonus" b
    LEFT JOIN "_BonusToPost" bp ON b.id = bp."A"
    LEFT JOIN "Post" p ON bp."B" = p.id
    WHERE b.id = ?
    GROUP BY b.id`

  const res = await kdb.raw(bonusSQL, [Number(id)])
  return res.rows[0] || null
}
