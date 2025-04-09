'use client'

import { Input, MultiSelect, MultiSelectObj, SelectObj, Switch, Textarea } from 'zvijude/form'
import { Btn } from 'zvijude/btns'
import { getFormData, getMultiFormData } from 'zvijude/form/funcs'

import { Title } from '@/ui/Title'
import { redirect } from 'next/navigation'
import Pop from '@/ui/Pop'
import { addAdminMsg, updateAdminMsg } from './db/set'
import SendTo from './SendTo'
import { toast } from 'zvijude/pop'

export default function AdminMsgPop({ users, communityId, adminMsg }) {
  const adminMsgId = adminMsg?.id

  async function onSubmit(e) {
    toast('loading', 'טוען')

    const data = getMultiFormData(e) as any

    data.all = Boolean(data.all)
    if (adminMsgId) {
      await updateAdminMsg(data, adminMsgId, communityId)
    } else {
      await addAdminMsg(data, communityId)
    }
    toast('success', 'בוצע בהצלחה')

    redirect(`/admin/${communityId}/admin-msgs`)
  }

  return (
    <Pop className='max-w-[500px] min-w-[400px]'>
      <Title lbl={adminMsg ? 'עריכת פרטי ההודעה' : 'פרטי הודעה חדשה'} className='mb-8' />
      <form className='space-y-4' onSubmit={onSubmit}>
        <Input lbl='נושא ההודעה' name='title' defaultValue={adminMsg?.title} />
        <Textarea name='desc' lbl='תיאור ההודעה' defaultValue={adminMsg?.desc} />
        <SendTo users={users} adminMsg={adminMsg} />
        <div className='grid grid-cols-2 gap-4 mt-8 col-span-2'>
          <Btn onClick={() => redirect(`/admin/${communityId}/admin-msgs`)} lbl='יציאה ללא שמירה' type='button' clr='text' />
          <Btn lbl='שמירת פרטי ההודעה' />
        </div>
      </form>
    </Pop>
  )
}

function formatDateToCustomFormat(isoDate) {
  const date = new Date(isoDate)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day}T${hours}:${minutes}`
}
