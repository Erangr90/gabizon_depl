'use client'
import { Btn } from 'zvijude/btns'
import EditDelete from './EditDelete'
import { useRouter } from 'next/navigation'
import { BonusCard } from './BonusCard'

export default function BonusesSection({ bonuses, communityId }) {
  const router = useRouter()

  return (
    <>
      <div className='my-8'>
        <div className='flex justify-between items-end mb-6'>
          <Btn lbl='הוספת בונוס חדש' icon='plus' onClick={() => router.push(`/admin/${communityId}/bonuses/0`)} />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {bonuses.map((bonus) => (
            <div key={bonus.id} className='grid grid-cols-1 gap-4'>
              <EditDelete item={bonus} />
              <BonusCard key={bonus.id} bonus={bonus} communityId={communityId} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
