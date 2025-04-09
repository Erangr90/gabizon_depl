'use client'

import { Input, SelectObj, Switch, Textarea } from 'zvijude/form'
import { Btn } from 'zvijude/btns'
import { getFormData } from 'zvijude/form/funcs'
import { addPost, updatePost } from './db/set'

import { Title } from '@/ui/Title'
import { redirect } from 'next/navigation'
import Pop from '@/ui/Pop'
import { UploadBtn } from '@/lib/welcome/UploadBtn'
import { toast } from 'zvijude/pop'

export default function PostPop({ creators, communityId, post }) {
  const postId = post?.id

  async function onSubmit(e) {
    toast('loading', 'טוען')
    const data = getFormData(e) as any
    if (data.media) data.media = data.media.split(',')
    data.published ? (data.published = true) : (data.published = false)

    if (data.sum) data.sum = data.sum.split(',')

    if (postId) {
      await updatePost(data, postId, communityId)
    } else {
      await addPost(data, communityId)
    }
    toast('success', 'בוצע בהצלחה')

    redirect(`/admin/${communityId}/library`)
  }

  // <dialog className='pop left-1/2' open={post?.id} id='postPop'>
  return (
    <Pop className='min-w-[500px] max-h-[90vh] overflow-auto'>
      <Title lbl={post ? 'עריכת פרטי השיעור' : 'פרטי שיעור חדש'} className='mb-8' />
      <form className='grid grid-cols-2 gap-6' onSubmit={onSubmit}>
        <SelectObj defaultValue={post?.creator?.id} options={creators} show='firstName' val='id' name='creator' lbl='שם המרצה' />
        <Input lbl='תאריך ושעת התחלה' type='datetime-local' name='date' defaultValue={formatDatetime(post?.date)} />
        <Input lbl='תאריך ושעת סיום' type='datetime-local' name='endTime' defaultValue={formatDatetime(post?.endTime)} />
        <Input lbl='נושא השיעור' name='title' defaultValue={post?.title} />
        <Input lbl='לינק לזום שיעור' name='zoom' defaultValue={post?.zoom} />
        <span className='col-span-2'>
          <Textarea name='desc' lbl='תיאור השיעור' defaultValue={post?.desc} />
        </span>

        <span className='col-span-2 grid grid-cols-2 gap-4'>
          <UploadBtn
            multiple
            name='media'
            lbl='העלאת קבצי שיעור'
            icon={{ name: 'file-arrow-up' }}
            defaultValue={post?.media.join(', ')}
          />
          <UploadBtn
            multiple
            name='sum'
            lbl='העלאת קבצי סיכום'
            icon={{ name: 'file-arrow-up' }}
            defaultValue={post?.media.join(', ')}
          />
        </span>

        <Input lbl='לינק ליוטיוב' name='yt' defaultValue={post?.zoom} />
        <Switch name='published' lbl='הוספת שיעור לספרייה' defaultChecked={post?.published} />

        <div className='grid grid-cols-2 gap-4 mt-8 col-span-2'>
          <Btn onClick={() => redirect(`/admin/${communityId}/library`)} lbl='יציאה ללא שמירה' type='button' clr='text' />
          <Btn lbl='שמירת פרטי השיעור' />
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
