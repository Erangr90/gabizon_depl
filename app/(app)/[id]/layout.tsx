import AppSidebar from '@/components/AppSidebar'
import AppTopbar from '@/components/AppTopbar'
import Bottombar from '@/components/Bottombar'
import GlobalLayout from '@/ui/GlobalLayout'
import { getCommunityByIdWithCreators } from '@/lib/welcome/db'
import { getUser } from 'zvijude/auth/funcs'

export default async function RootLayout({ children, params }) {
  await params
  const { id } = await params
  const community = await getCommunityByIdWithCreators(id)
  const user = await getUser()

  console.log('my user: ', user)
  return (
    <GlobalLayout>
      <main
        className='flex flex-row '
        style={
          {
            gap: 0,
            alignItems: 'unset',
            '--color-solid': community.solid,
            '--color-soft': community.soft,
            '--color-bg': community.bg,
          } as React.CSSProperties
        }
      >
        <AppSidebar user={user} community={community} />
        <section className='md:mr-60 md:flex-grow w-full '>
          <AppTopbar user={user} community={community} />
          {children}
          <Bottombar communityId={id} />
        </section>
      </main>
    </GlobalLayout>
  )
}
