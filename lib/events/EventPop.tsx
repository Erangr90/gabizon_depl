'use client'

import { Input, Select, SelectObj, Switch, Textarea } from 'zvijude/form'
import { Btn } from 'zvijude/btns'
import { getFormData } from 'zvijude/form/funcs'

import { Title } from '@/ui/Title'
import { redirect } from 'next/navigation'
import Pop from '@/ui/Pop'
import { addEvent, updateEvent } from './db/set'
import { UploadBtn } from '@/lib/welcome/UploadBtn'
import { toast } from 'zvijude/pop'

export default function EventPop({ communityId, event }) {
  const eventId = event?.id

  async function onSubmit(e) {
    toast('loading', 'טוען')

    const data = getFormData(e) as any
    data.isOnline ? (data.isOnline = true) : (data.isOnline = false)
    if (data.media) data.media = data.media.split(',')

    if (eventId) {
      await updateEvent(data, eventId, communityId)
    } else {
      await addEvent(data, communityId)
    }
    toast('success', 'בוצע בהצלחה')

    redirect(`/admin/${communityId}/events`)
  }

  // <dialog className='pop left-1/2' open={post?.id} id='postPop'>
  return (
    <Pop closePath={`/admin/${communityId}/events`}>
      <Title lbl={event ? 'עריכת פרטי אירוע ' : 'פרטי אירוע חדש'} className='mb-8' />
      <form className='grid grid-cols-2 gap-6' onSubmit={onSubmit}>
        <Input lbl='כותרת האירוע' name='title' defaultValue={event?.title} />

        <Switch lbl='אירוע אונליין' name='isOnline' defaultChecked={event?.isOnline} />
        <Input lbl='מיקום האירוע' name='loc' defaultValue={event?.loc} />
        <Input lbl='תאריך האירוע' type='datetime-local' name='date' defaultValue={formatDatetime(event?.date)} />
        <Input lbl='תאריך ושעת סיום' type='datetime-local' name='endTime' defaultValue={formatDatetime(event?.endTime)} />

        <Input lbl='תיאור האירוע' name='desc' defaultValue={event?.desc} />
        <Input lbl='קישור לאירוע' name='link' defaultValue={event?.link} />
        <Input required={false} lbl='קישור לתשלום' name='payLink' defaultValue={event?.payLink} />
        <span className='col-span-2'>
          <UploadBtn name='img' lbl='העלאת תמונה' icon={{ name: 'file-arrow-up' }} defaultValue={event?.img} />
        </span>

        <div className='grid grid-cols-2 gap-4 mt-8 col-span-2'>
          <Btn onClick={() => redirect(`/admin/${communityId}/events`)} lbl='יציאה ללא שמירה' type='button' clr='text' />
          <Btn lbl='שמירת פרטי אירוע' />
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
