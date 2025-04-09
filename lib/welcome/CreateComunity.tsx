'use client'

import { Btn } from 'zvijude/btns'
import { Input } from 'zvijude/form'
import { getFormData } from 'zvijude/form/funcs'
import CreatorsForm from './CreatorsForm'
import { UploadBtn } from 'zvijude/cloudinary/upload'
import { addComunity, updateCommunity } from './db'
import { useState } from 'react'
import { redirect } from 'next/navigation'

let currentCreators = []

export default function CreateComunity({ community }) {
  const [state, setState] = useState(false) as any
  const render = () => setState(!state)

  if (community?.creators) currentCreators = community.creators

  async function onSubmit(e) {
    const data = getFormData(e)
    if (!data.img) return alert('נא להעלות תמונה')

    if (community?.id) {
      const success = await updateCommunity(data, community.id)
    } else {
      data.creators = currentCreators
      const success = await addComunity(data)
      if (Boolean(success)) {
        console.log('ssss')

        redirect('/')
      }
    }
  }

  return (
    <div className=' mx-auto w-[450px] mt-4 py-8 space-y-8 bg-white p-8 border shadow-md rounded-lg'>
      <form id='community' onSubmit={onSubmit} className='space-y-6'>
        <Input defaultValue={community?.name} lbl='שם הקהילה' name='name' placeholder='שם הקהילה' />

        <UploadBtn
          defaultValue={community?.img}
          className='bg-soft text-solid hover:bg-soft'
          icon={{ cls: 'bg-solid', type: 'reg' }}
          lbl='העלאת תמונת לוגו'
          name='img'
        />
        <UploadBtn
          defaultValue={community?.img}
          className='bg-soft text-solid hover:bg-soft'
          icon={{ cls: 'bg-solid', type: 'reg' }}
          lbl='תמונת רקע'
          name='bgImg'
        />

        <div className='grid grid-cols-3 gap-6'>
          <Input defaultValue={community?.solid} lbl='צבע ראשי' name='solid' type='color' />
          <Input defaultValue={community?.soft} lbl='צבע משני' name='soft' type='color' />
          <Input defaultValue={community?.bg} lbl='צבע רקע' name='bg' type='color' />
        </div>
        <Input defaultValue={community?.smooveApiKey} lbl='מפתח גישה ל-Smoove' name='smooveApiKey' required={false} />
        <Input defaultValue={community?.smooveListId} lbl='מספר רשימה ב-Smoove' name='smooveListId' required={false} />
      </form>

      <CreatorsForm creators={currentCreators} render={render} community={community} />

      <Btn form='community' lbl='שמירה' icon='floppy-disk' className='w-full' />
    </div>
  )
}
