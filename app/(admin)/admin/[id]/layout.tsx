import Sidebar from '@/components/sidebar'
import GlobalLayout from '@/ui/GlobalLayout'
import { getCommunityByIdWithCreators } from '@/lib/welcome/db'
import { getUser } from 'zvijude/auth/funcs'

export default async function AdminLayout({ children, params }) {
  const { id } = await params
  const community = await getCommunityByIdWithCreators(id)
  const user = await getUser()
  return (
    <GlobalLayout>
      <main
        className='flex flex-row'
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
        <Sidebar user={user} community={community} />
        <section className='mr-60 flex-grow'>{children}</section>
      </main>
    </GlobalLayout>
  )
}
