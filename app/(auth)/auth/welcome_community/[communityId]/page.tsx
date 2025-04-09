import UserForm from '@/lib/auth/UserForm'
import { getCommunityById } from '@/lib/welcome/db'
import { redirect } from 'next/navigation'

export default async function WelcomeCommunity({ params }) {
  const { communityId } = await params
  const community = await getCommunityById(communityId)
  console.log('community: ', community)
  if (!community) {
    redirect(`/auth?errCode=${communityId}`)
  }

  return (
    <div
      className='grid grid-cols-2 w-screen place-items-center mobile:grid-cols-1 mobile:mt-24'
      style={
        {
          '--color-solid': community?.solid,
          '--color-soft': community?.soft,
          '--color-bg': community?.bg,
        } as React.CSSProperties
      }
    >
      <div className='grid place-items-center gap-6'>
        <h1 className='text-5xl font-bold mobile:text-3xl mb-8'>
          ברוכים הבאים ל- <span className='text-solid'>{community?.name}</span>
        </h1>
        <UserForm community={community} />
      </div>

      <img src={community?.bgImg || '/auth_bg.png'} alt='' className='w-full h-screen mobile:hidden' />
    </div>
  )
}
