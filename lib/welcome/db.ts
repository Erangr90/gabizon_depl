'use server'

import { kdb } from '@/db/knex'
import { Community, Creator } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export async function addComunity(data: any) {
  let sucsses = true
  const creators = data.creators as Creator[]
  delete data.creators
  console.log('data is', data)

  try {
    const [communityId] = await kdb('Community').insert(data).returning('id')
    console.log('creators,', creators)

    if (creators.length) await kdb('Creator').insert(creators.map((c) => ({ ...c, communityId: communityId.id })))
  } catch (error) {
    sucsses = false
  }
  return sucsses

  // return res ? true : false
}

export async function addCreator(data: any) {
  const res = await kdb('Creator').insert(data)
  return res ? true : false
}

export async function updateCreator(data: any, id: string) {
  const res = await kdb('Creator').update(data).where({ id })
  return res ? true : false
}

export async function updateCommunity(data: any, id: string) {
  const res = await kdb('Community').update(data).where({ id })

  revalidatePath('/community-managment')
}

export async function getComunities() {
  const communities = await kdb.raw(`
    SELECT 
      c.*,
      json_agg(cr.*) FILTER (WHERE cr.id IS NOT NULL) as creators
    FROM "Community" c
    LEFT JOIN "Creator" cr ON c.id = cr."communityId"
    GROUP BY c.id
  `)

  return communities.rows
}

export async function getCommunityByIdWithCreators(id: string) {
  const sql = `
    SELECT
      c.*,
      JSON_AGG(
        JSON_BUILD_OBJECT(
          'id', cr.id,
          'firstName', cr."firstName",
          'lastName', cr."lastName",
          'img', cr.img
        )
      ) as creators
    FROM "Community" c
    LEFT JOIN "Creator" cr ON cr."communityId" = c.id
    WHERE c.id = ?
    GROUP BY c.id
  `
  const res = await kdb.raw(sql, id)
  return res.rows[0] || null
}

export async function getCommunitiesByUserIdAndRole(userId, ROLE) {
  return await kdb('Community')
  if (ROLE == 'ADMIN') {
    return await kdb('Community')
  } else {
    return await kdb('Community')
      .join('UserCommunity', 'Community.id', 'UserCommunity.communityId') // Adjust table names if necessary
      .where('UserCommunity.userId', Number(userId))
      .select('Community.*') // Get all community fields
      .distinct()
  }
}

export async function getCommunityById(id: string) {
  const community = await kdb('Community').where({ id }).first()
  return community as any
}
