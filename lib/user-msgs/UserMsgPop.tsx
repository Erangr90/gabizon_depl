'use client'

import { Input, SelectObj, Textarea } from 'zvijude/form'
import { Btn } from 'zvijude/btns'
import { getFormData } from 'zvijude/form/funcs'
import { Title } from '@/ui/Title'
import { redirect } from 'next/navigation'
import Pop from '@/ui/Pop'
import { addUserMsg, updateUserMsg } from './db/set'
import { toast } from 'zvijude/pop'

export default function UserMsgPop({ communityId, userMsg }) {
  const userMsgId = userMsg?.id

  async function onSubmit(e) {
    toast('loading', 'טוען')

    const data = getFormData(e)

    await updateUserMsg(data, userMsgId, communityId)
    toast('success', 'בוצע בהצלחה')

    redirect(`/admin/${communityId}/user-msgs`)
  }

  // enum UserMsgStatus {
  //   NEW
  //   PENDING
  //   COMPLETED
  //   CANCELED
  // }
  const options = [
    { lbl: 'פנייה חדשה', val: 'NEW' },
    { lbl: 'בטיפול', val: 'PENDING' },
    { lbl: 'הושלמה', val: 'COMPLETED' },
    { lbl: 'בוטלה', val: 'CANCELED' },
  ]

  return (
    <Pop className='min-w-[500px]'>
      <Title lbl={userMsg ? 'תגובת מנהל' : 'פרטי פנייה חדשה'} className='mb-8' />
      <form onSubmit={onSubmit}>
        <div className='grid grid-cols-1 gap-4 w-full'>
          {/* <Input lbl='כותרת ההודעה' name='title' defaultValue={userMsg?.title} />
          <Textarea name='desc' lbl='תיאור ההודעה' defaultValue={userMsg?.desc} /> */}
          <SelectObj name='status' lbl='סטטוס פנייה' options={options} val='val' show='lbl' defaultValue={userMsg?.status} />
          <Textarea lbl='תגובת מנהל' name='answer' defaultValue={userMsg?.answer} />
        </div>
        <div className='grid grid-cols-2 gap-4 mt-8 col-span-2'>
          <Btn onClick={() => redirect(`/admin/${communityId}/user-msgs`)} lbl='יציאה ללא שמירה' type='button' clr='text' />
          <Btn lbl='שמירת פרטי פנייה' />
        </div>
      </form>
    </Pop>
  )
}
{
  /* <div className='mb-2'>
<Btn popoverTarget='userMsgPop' lbl='פתיחת פנייה חדשה' className='mx-auto md:mx-0' icon='plus' />
<form id='userMsgPop' popover='auto' className='pop' onSubmit={onSubmit}>
  <Title lbl={' פנייה חדשה'} className='mb-6 ' />
  <div className='grid grid-cols-1 gap-4 w-72'>
    <Input lbl='נושא הפנייה' name='title' />
    <Textarea name='desc' lbl='תוכן הפנייה' />
    <Btn className='w-full' lbl=' שליחת פנייה' />
  </div>
</form>
</div> */
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
