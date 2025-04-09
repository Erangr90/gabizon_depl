import { getUserById, getUsers } from '@/lib/users/db/get'
import FilterPop from '@/lib/users/FilterPop'
import UserPop from '@/lib/users/UserPop'
import UsersTable from '@/lib/users/UsersTable'
import { User } from '@prisma/client'
import Title from 'zvijude/general/Title'

export default async function UsersPage({ params, searchParams }) {
  const { id, userId } = await params
  let { query: filter } = await searchParams

  if (filter) filter = JSON.parse(filter)
  const users = (await getUsers(id, filter)) as User[]

  let user = {} as User | null
  if (userId && userId !== '0') user = await getUserById(userId)
  return (
    <main className='bg-bg_main_color h-screen p-8'>
      <Title lbl={'משתמשים'} />
      <FilterPop communityId={id} />

      <UsersTable data={users} communityId={id} key={Math.random()} />
      {userId && <UserPop communityId={id} user={user} />}
    </main>
  )
}
