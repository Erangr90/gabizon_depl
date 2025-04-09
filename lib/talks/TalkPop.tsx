'use client'

import { Input, SelectObj, Textarea } from 'zvijude/form'
import { Btn } from 'zvijude/btns'
import { getFormData } from 'zvijude/form/funcs'
import { Title } from '@/ui/Title'
import { redirect } from 'next/navigation'
import Pop from '@/ui/Pop'
import { addTalk, updateTalk } from './db/set'
import { toast } from 'zvijude/pop'

export default function TalkPop({ communityId, talk }) {
  const talkId = talk?.id

  async function onSubmit(e) {
    toast('loading', 'טוען')

    const data = getFormData(e) as any

    if (talkId) {
      await updateTalk(data, talkId, communityId)
    } else {
      await addTalk(data, communityId)
    }
    toast('success', 'בוצע בהצלחה')

    redirect(`/admin/${communityId}/talks`)
  }

  return (
    <Pop className='max-w-[500px]'>
      <Title lbl={talk ? 'עריכת פרטי דיון' : 'פרטי דיון חדש'} className='mb-8' />
      <form className='grid grid-cols-2 gap-6' onSubmit={onSubmit}>
        <Input lbl='נושא הדיון' name='title' defaultValue={talk?.title} />

        <Input lbl='תאריך הדיון' type='datetime-local' name='date' defaultValue={formatDatetime(talk?.date)} />
        <Input lbl='תאריך ושעת סיום' type='datetime-local' name='endTime' defaultValue={formatDatetime(talk?.endTime)} />

        <Input lbl='לינק לדיון' name='link' defaultValue={talk?.link} />

        <div className='grid grid-cols-2 gap-4 mt-8 col-span-2'>
          <Btn onClick={() => redirect(`/admin/${communityId}/talks`)} lbl='יציאה ללא שמירה' type='button' clr='text' />
          <Btn lbl='שמירת פרטי הדיון' />
        </div>
      </form>
    </Pop>
  )
}

function formatDatetime(dateString) {
  const date = new Date(dateString)

  // Extract year, month, day, hours, and minutes
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  // Return in the desired format
  return `${year}-${month}-${day}T${hours}:${minutes}`
}
