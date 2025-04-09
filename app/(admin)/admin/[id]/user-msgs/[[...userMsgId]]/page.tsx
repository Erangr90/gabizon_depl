import { getUserMsgById, getUserMsgs } from '@/lib/user-msgs/db/get'
import UserMsgPop from '@/lib/user-msgs/UserMsgPop'
import UserMsgsTable from '@/lib/user-msgs/UserMsgsTable'

import { UserMsg, User } from '@prisma/client'
import Title from 'zvijude/general/Title'

export default async function UserMsgsPage({ params }) {
  const { id, userMsgId } = await params
  const userMsgs = (await getUserMsgs()) as UserMsg[]
  console.log('userMsgs', userMsgs)

  let userMsg = {} as UserMsg | null
  if (userMsgId && userMsgId !== '0') userMsg = await getUserMsgById(userMsgId)

  return (
    <main className='bg-bg_main_color h-screen p-8'>
      <Title lbl={'פניות שירות'} />
      <UserMsgsTable data={userMsgs} communityId={id} key={Math.random()} />
      {userMsgId && <UserMsgPop communityId={id} userMsg={userMsg} />}
    </main>
  )
}
