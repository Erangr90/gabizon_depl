import CreateComunity from '@/lib/welcome/CreateComunity'
import { getCommunityByIdWithCreators } from '@/lib/welcome/db'
import { Community } from '@prisma/client'
import Title from 'zvijude/general/Title'

export default async function CommunityPage({ params }) {
  const { id } = await params
  let community = {} as Community | null
  community = await getCommunityByIdWithCreators(id)
  return (
    <main className='bg-bg_main_color h-screen p-8'>
      <Title lbl={'ניהול קהילה'} />
      <CreateComunity community={community} />
    </main>
  )
}
