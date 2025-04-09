import { getBonuses } from '@/lib/bonuses/db/get'
import { BonusCard } from '@/lib/bonuses/BonusCard'
import React from 'react'

export default async function page({ params }) {
  const { id } = await params
  const bonuses = await getBonuses(id)

  return (
    <main className='bg-bg_main_color min-h-screen px-4 md:px-8 pb-32 md:pb-8 pt-20'>
      {bonuses.length > 0 && (
        <>
          <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
            {bonuses.map((bonus) => (
              <BonusCard communityId={id} key={bonus.id} bonus={bonus} />
            ))}
          </div>
        </>
      )}
    </main>
  )
}
