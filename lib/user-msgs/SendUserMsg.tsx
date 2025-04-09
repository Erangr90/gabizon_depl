'use client'
import { redirect } from 'next/navigation'
import { Btn } from 'zvijude/btns'
import { Input, Textarea } from 'zvijude/form'
import { getFormData } from 'zvijude/form/funcs'
import Title from 'zvijude/general/Title'
import { addUserMsg } from './db/set'

export function SendUserMsg({ communityId, userId }) {
  async function onSubmit(e) {
    const data = getFormData(e)

    const res = await addUserMsg(data, communityId, userId)
    if (res === 'success') {
      alert('ההודעה נשלחה בהצלחה')
      document.getElementById('userMsgPop')?.hidePopover()
      redirect(`/${communityId}/user-msgs?msg=success`)
    } else {
      alert('אירעה שגיאה בשליחת ההודעה')
      document.getElementById('userMsgPop')?.hidePopover()
      redirect(`/${communityId}/user-msgs?msg=failed`)
    }
  }

  return (
    <div className='mb-2'>
      <Btn popoverTarget='userMsgPop' lbl='פתיחת פנייה חדשה' className='mx-auto md:mx-0' icon='plus' />
      <form id='userMsgPop' popover='auto' className='pop' onSubmit={onSubmit}>
        <Title lbl={' פנייה חדשה'} className='mb-6 ' />
        <div className='grid grid-cols-1 gap-4 w-72'>
          <Input lbl='נושא הפנייה' name='title' />
          <Textarea name='desc' lbl='תוכן הפנייה' />
          <Btn className='w-full' lbl=' שליחת פנייה' />
        </div>
      </form>
    </div>
  )
}
