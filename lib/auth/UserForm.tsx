'use client'

import { Btn } from 'zvijude/btns'
import { Input } from 'zvijude/form'
import { getFormData } from 'zvijude/form/funcs'
import { getSmooveUser } from './smoove'
import { addUser } from '../users/db/set'
import { redirect } from 'next/navigation'
import { saveCoki } from './api'

export default function UserForm({ community }) {
  async function onSubmit(e) {
    const data = getFormData(e)
    console.log('data: ', data)

    const isSmooveUser = await getSmooveUser(data.email, community)
    console.log('isSmooveUser: ', isSmooveUser)
    if (!isSmooveUser) return alert('אינך משתמש ב smoove')

    const userObj = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
    }

    const userId = await addUser(userObj, community.id)

    await saveCoki({ ...userObj, id: userId })

    redirect(`/${community.id}/home`)
  }

  return (
    <div>
      <h1 className='text-2xl mb-8'>להצטרפות לקהילה מלא את הפרטים</h1>
      <form onSubmit={onSubmit} className='grid grid-cols-2 gap-4'>
        <Input lbl='שם פרטי' name='firstName' />
        <Input lbl='שם משפחה' name='lastName' />
        <Input lbl='מייל שנרשמת איתו לחשבון' name='email' type='email' dir='ltr' />
        <Input lbl='טלפון' name='phone' required={false} type='number' />
        <Btn lbl='הצטרפות לקהילה' className='col-span-2' />
      </form>
    </div>
  )
}
