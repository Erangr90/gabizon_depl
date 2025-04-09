'use client'

import { Input, MultiSelectObj } from 'zvijude/form'
import { Btn } from 'zvijude/btns'
import { getMultiFormData } from 'zvijude/form/funcs'
import { Title } from '@/ui/Title'
import { redirect } from 'next/navigation'
import Pop from '@/ui/Pop'
import { addBonus, updateBonus } from './db/set' // renamed from addSeason/updateSeason
import { UploadBtn } from '@/lib/welcome/UploadBtn'
import { toast } from 'zvijude/pop'

export default function BonusPop({ posts, communityId, bonus }) {
  const bonusId = bonus?.id

  async function onSubmit(e) {
    toast('loading', 'טוען')

    const data = getMultiFormData(e) as any
    if (!data.posts) data.posts = []
    if (data.media) data.media = data.media.split(',')

    if (bonusId) {
      await updateBonus(data, bonusId, communityId)
    } else {
      await addBonus(data, communityId)
    }
    toast('success', 'בוצע בהצלחה')

    redirect(`/admin/${communityId}/bonuses`)
  }

  const options = [...posts, ...(bonus?.posts || [])].reduce((unique, item) => {
    return unique.some((obj) => obj.id === item.id) ? unique : [...unique, item]
  }, [])

  return (
    <Pop className='min-w-[500px]'>
      <Title lbl={bonus ? 'עריכת פרטי בונוס' : 'פרטי בונוס חדש'} className='mb-8' />
      <form className='grid grid-cols-2 items-end gap-6' onSubmit={onSubmit}>
        <Input lbl='כותרת הבונוס' name='title' defaultValue={bonus?.title} />
        <UploadBtn name='img' lbl='העלאת תמונה' icon={{ name: 'file-arrow-up' }} defaultValue={bonus?.img} />
        <MultiSelectObj
          options={options}
          placeholder='בחירת שיעורים'
          id='posts'
          show='title'
          val='id'
          selected={bonus?.posts || []}
        />

        <div className='grid grid-cols-2 gap-4 mt-8 col-span-2'>
          <Btn onClick={() => redirect(`/admin/${communityId}/bonuses`)} lbl='יציאה ללא שמירה' type='button' clr='text' />
          <Btn lbl='שמירת פרטי בונוס' />
        </div>
      </form>
    </Pop>
  )
}

// function formatDateToCustomFormat(isoDate) {
//   const date = new Date(isoDate)

//   const year = date.getFullYear()
//   const month = String(date.getMonth() + 1).padStart(2, '0')
//   const day = String(date.getDate()).padStart(2, '0')
//   const hours = String(date.getHours()).padStart(2, '0')
//   const minutes = String(date.getMinutes()).padStart(2, '0')
//   return `${year}-${month}-${day}T${hours}:${minutes}`
// }
