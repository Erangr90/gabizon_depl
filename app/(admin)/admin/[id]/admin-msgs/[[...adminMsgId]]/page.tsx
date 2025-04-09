import { getUsers } from '@/db/user/get'
import AdminMsgPop from '@/lib/admin-msgs/AdminMsgPop'
import AdminMsgsTable from '@/lib/admin-msgs/AdminMsgsTable'
import { getAdminMsgById, getAdminMsgs } from '@/lib/admin-msgs/db/get'
import { AdminMsg } from '@prisma/client'
import Title from 'zvijude/general/Title'

export default async function AdminMsgsPage({ params }) {
  const { id, adminMsgId } = await params
  const adminMsgs = (await getAdminMsgs(id)) as AdminMsg[]
  const users = await getUsers()

  let adminMsg = {} as AdminMsg | null
  if (adminMsgId && adminMsgId !== '0') adminMsg = await getAdminMsgById(adminMsgId)
  return (
    <main className="bg-bg_main_color h-screen p-8">
      <Title lbl={'הודעות מנהל '} />
      <AdminMsgsTable data={adminMsgs} communityId={id} key={Math.random()} />
      {adminMsgId && <AdminMsgPop communityId={id} adminMsg={adminMsg} users={users} />}
    </main>
  )
}
