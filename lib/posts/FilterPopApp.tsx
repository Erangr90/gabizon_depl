'use client'

import { redirect } from 'next/navigation'
import { Btn } from 'zvijude/btns'
import { Input, SelectObj } from 'zvijude/form'
import { getFormData } from 'zvijude/form/funcs'

export default function FilterPopApp({ creators, communityId }) {
  function onSubmit(e) {
    const data = getFormData(e) as any
    const url = new URLSearchParams({ query: JSON.stringify(data) })
    redirect('?' + url)
  }

  return (
    <form className='pop min-w-[250px]' popover='auto' id='filterPosts' onSubmit={onSubmit}>
      <div className='grid gap-4'>
        <SelectObj
          required={false}
          options={creators}
          name='creatorId'
          lbl='יוצר'
          placeholder='בחר יוצר'
          show='firstName'
          val='id'
        />
        <Input required={false} lbl='שיעורים מתאריך' type='date' name='date' />
        <Btn lbl='סינון' icon='filter' />
        <Btn lbl='איפוס סינונים' type='button' clr='text' icon='eraser' onClick={() => redirect(`/${communityId}/library`)} />
      </div>
    </form>
  )
}
