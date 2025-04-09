'use client'

import { Input, Select, SelectObj, Textarea } from 'zvijude/form'
import { Btn } from 'zvijude/btns'
import { getFormData } from 'zvijude/form/funcs'

import { Title } from '@/ui/Title'
import { redirect } from 'next/navigation'
import Pop from '@/ui/Pop'
import { UploadBtn } from '@/lib/welcome/UploadBtn'
import { addUser, updateUser } from './db/set'
import { toast } from 'zvijude/pop'

export default function UserPop({ communityId, user }) {
  const userId = user?.id

  async function onSubmit(e) {
    toast('loading', 'טוען')

    const data = getFormData(e)

    if (userId) {
      await updateUser(data, userId, communityId)
    } else {
      await addUser(data, communityId)
    }
    toast('success', 'בוצע בהצלחה')

    redirect(`/admin/${communityId}/users`)
  }

  // <dialog className='pop left-1/2' open={post?.id} id='postPop'>
  return (
    <Pop className='max-w-[500px]'>
      <Title lbl={user ? 'עריכת פרטי משתמש ' : 'פרטי משתמש חדש'} className='mb-8' />
      <form className='grid grid-cols-2 gap-6' onSubmit={onSubmit}>
        <Input lbl='שם פרטי' name='firstName' defaultValue={user?.firstName} />
        <Input lbl='שם משפחה' name='lastName' defaultValue={user?.lastName} />
        <Input lbl='תאריך לידה' type='date' name='birthday' defaultValue={formatDate(user?.birthday)} />
        <Input lbl='טלפון' name='phone' defaultValue={user?.phone} />
        <Input lbl='מייל' name='email' defaultValue={user?.email} />
        {/* <Input lbl="גיל" type="number" name="age" defaultValue={user?.age} /> */}

        <Select
          defaultValue={user?.origin}
          placeholder='בחר מקור'
          options={['אחר', 'ווצאפ', 'פייסבוק', 'הכל']}
          name='origin'
          lbl='מקור'
        />
        <Select defaultValue={user?.status} placeholder='בחר סטטוס' options={['חסום', 'פעיל', 'הכל']} name='status' lbl='סטטוס' />
        <div className='grid grid-cols-2 gap-4 mt-8 col-span-2'>
          <Btn onClick={() => redirect(`/admin/${communityId}/users`)} lbl='יציאה ללא שמירה' type='button' clr='text' />
          <Btn lbl='שמירת פרטי משתמש' />
        </div>
      </form>
    </Pop>
  )
}
function formatDate(datetimeString) {
  // Create a new Date object from the input string
  const date = new Date(datetimeString)

  // Extract the year, month, and day components
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0')

  // Return the formatted date string
  return `${year}-${month}-${day}`
}
