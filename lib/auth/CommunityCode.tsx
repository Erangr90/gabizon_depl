'use client'

import { redirect } from 'next/navigation'
import { Btn } from 'zvijude/btns'
import { Input } from 'zvijude/form'
import { getFormData } from 'zvijude/form/funcs'

export default function CommunityCode() {
  function onSubmit(e) {
    const data = getFormData(e)

    redirect('/auth/welcome_community/' + data.code)
  }

  return (
    <div className='grid gap-4'>
      <h1 className='text-2xl'>הכנס את קוד הקהילה שקיבלת</h1>
      <form className='grid gap-4' onSubmit={onSubmit}>
        <Input lbl='קוד קהילה' name='code' />
        <Btn lbl='המשך' icon='arrow-left' className='flex-row-reverse' />
      </form>
    </div>
  )
}
