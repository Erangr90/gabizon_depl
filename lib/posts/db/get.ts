'use server'
import { TPostFilter } from '@/types'
import { db } from '../../../db/db'
import { Post } from '@prisma/client'
import { kdb } from '@/db/knex'

export async function searchPosts(query: string): Promise<Post[]> {
  // This function searches for posts that contain the query string in their title or description.
  return await db.post.findMany({
    where: {
      OR: [{ title: { contains: query } }, { desc: { contains: query } }, { creator: { name: { contains: query } } }],
    },
  })
}
export async function getPosts(communityId: string, filter?: any) {
  const params = [communityId]
  let sql = `
    SELECT 
      p.*,
      c.id as "creatorId",
      c."firstName"
    FROM "Post" p
    LEFT JOIN "Creator" c ON p."creatorId" = c.id
    WHERE p."communityId" = ?`

  if (filter?.creatorId) {
    sql += ` AND p."creatorId" = ?`
    params.push(filter.creatorId)
  }
  if (filter?.past) {
    sql += ` AND p.date < to_timestamp(${Date.now() / 1000})`
  }
  if (filter?.upcoming) {
    sql += ` AND p.date > to_timestamp(${Date.now() / 1000})`
  }

  sql += ` ORDER BY p."createdAt" DESC`

  const res = await kdb.raw(sql, params)
  return res.rows
}

export async function getTitleDescIdPosts(communityId: string) {
  return await db.post.findMany({
    where: {
      communityId: Number(communityId),
    },
    select: {
      title: true,
      desc: true,
      id: true,
    },

    orderBy: {
      createdAt: 'desc',
    },
  })
}

function formatFilter(filter: TPostFilter) {
  const query: any = { where: {} }
  if (filter.creatorId) query.where.creatorId = Number(filter.creatorId)
  if (filter.time) query.where.time = { lte: Number(filter.time) }

  filter.sort === 'watched'
    ? (query.orderBy = { watched: { _count: 'desc' } })
    : (query.orderBy = { createdAt: filter.sort || 'asc' })

  return query
}

export async function filterPosts(filter: TPostFilter) {
  const query = formatFilter(filter)

  return await db.post.findMany(query)
}

export async function getPostById(id: string) {
  return await db.post.findUnique({
    where: {
      id: Number(id),
    },
  })
}
export async function getPostByIdIncludedCreator(id: string) {
  return await db.post.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      creator: true,
    },
  })
}

export async function homeGetPostsByDates(communityId: string, query): Promise<Post[]> {
  if (query) {
    if (query.creatorId) query.creatorId = Number(query.creatorId)
    if (query.date) query.date = { gte: new Date(query.date) }
  }
  return await db.post.findMany({
    where: {
      published: true,

      communityId: Number(communityId),
      ...query,
    },
    include: {
      creator: {
        select: {
          id: true,
          firstName: true,
        },
      },
    },
    orderBy: {
      date: 'desc',
    },
  })
}

export async function getPostsByDates(communityId: string, query): Promise<Post[]> {
  if (query) {
    if (query.creatorId) query.creatorId = Number(query.creatorId)
    if (query.date) query.date = { gte: new Date(query.date) }
  }
  return await db.post.findMany({
    where: {
      // OR: [
      //   { isBonus: true }, // If bonus is true, ignore the published condition
      //   { published: true }, // Otherwise, check if published is true
      // ],
      communityId: Number(communityId),
      ...query,
    },
    include: {
      creator: {
        select: {
          id: true,
          firstName: true,
        },
      },
    },
    orderBy: {
      date: 'desc',
    },
  })
}

export async function getSavedPosts(userId: string) {
  const savedPosts = await db.saved.findMany({
    where: {
      userId: Number(userId),
    },
    select: {
      postId: true,
    },
  })
  return savedPosts
}

// export async function filterPost(query: filterProps) {
//   switch (query.sort) {
//     case 'asc':
//       return await filterNewToOld(query)
//     case 'desc':
//       return await filterOldToNew(query)
//     case 'watched':
//       return await filterMostWatched(query)
//     default:
//       return await filterNewToOld(query)
//   }
// }

// async function filterNewToOld(query: filterProps) {
//   return await db.post.findMany({
//     where: {
//       creatorId: query.creatorId,
//       time: { gte: query.time },
//       type: query.type,
//     },
//     orderBy: {
//       createdAt: 'asc',
//     },
//   })
// }

// async function filterOldToNew(query: filterProps) {
//   return await db.post.findMany({
//     where: {
//       creatorId: query.creatorId,
//       time: { gte: query.time },
//       type: query.type,
//     },
//     orderBy: {
//       createdAt: 'desc',
//     },
//   })
// }

// async function filterMostWatched(query: filterProps) {
//   return await db.post.findMany({
//     where: {
//       creatorId: query.creatorId,
//       time: { gte: query.time },
//       type: query.type,
//     },
//     orderBy: { watched: { _count: 'desc' } },
//   })
// }
