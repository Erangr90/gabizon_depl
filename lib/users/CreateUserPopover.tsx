'use client'
import React from 'react'
import { Btn } from 'zvijude/btns'
import { Input } from 'zvijude/form'
import { getFormData } from 'zvijude/form/funcs'
import { createAdmin } from './db/set'
import { Title } from '@/ui/Title'

export default function CreateUserPopover() {
  async function onSubmit(e) {
    const data = getFormData(e)
    await createAdmin(data)
    document.getElementById('createUser')?.hidePopover()
  }
  return (
    <form popover='auto' className='pop gap-6' id='createUser' onSubmit={onSubmit}>
      <Title lbl='יצירת חשבון חדש' />
      <div className='grid gap-4 mt-6'>
        <Input lbl='שם פרטי' name='firstName' />
        <Input lbl='שם משפחה' name='lastName' />
        <Input lbl='תאריך לידה' type='date' name='birthday' />
        <Input lbl='טלפון' name='phone' />
        <Input lbl='מייל' name='email' />
        <Btn className='w-full' lbl='יצירת חשבון' />
      </div>
    </form>
  )
}

// firstName String
// lastName  String
// name      String?   @default(dbgenerated())
// age       Int?      @default(dbgenerated())
// phone     String
// email     String    @unique
// img       String?
// origin    String
// status    String
// birthday  DateTime?
