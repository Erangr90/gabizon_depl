'use server'

import { db } from '@/db/db'
import { Creator } from '@prisma/client'

export const getCreators = async (communityId): Promise<Creator[]> => {
  return await db.creator.findMany({
    where: {
      communityId: Number(communityId),
    },
  })
}
