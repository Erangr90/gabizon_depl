'use client'

import { redirect } from 'next/navigation'
import { Btn } from 'zvijude/btns'
import { Input, Select, SelectObj } from 'zvijude/form'
import { getFormData } from 'zvijude/form/funcs'

export default function FilterPop({ communityId }) {
  function onSubmit(e) {
    const data = getFormData(e) as any
    const url = new URLSearchParams({ query: JSON.stringify(data) })
    redirect('?' + url)
  }

  return (
    <form className='pop min-w-[250px]' popover='auto' id='filterUsers' onSubmit={onSubmit}>
      <div className='grid grid-cols-2 gap-4'>
        <Input required={false} lbl='הצטרף מתאריך' type='date' name='createdAt' />
        <Select required={false} placeholder='בחר סטטוס' options={['חסום', 'פעיל', 'הכל']} name='status' lbl='סטטוס' />
        <Select
          required={false}
          placeholder='בחר מקור'
          options={['אחר', 'ווצאפ', 'פייסבוק']}
          name='origin'
          lbl='מקור'
        />
        <Input required={false} lbl='מגיל' type='number' name='age' />

        <div className='grid grid-cols-2 gap-4 mt-8 col-span-2'>
          <Btn lbl='איפוס סינונים' type='button' clr='text' icon='eraser' href={`/admin/${communityId}/users`} />
          <Btn lbl='סינון' icon='filter' />
        </div>
      </div>
    </form>
  )
}
