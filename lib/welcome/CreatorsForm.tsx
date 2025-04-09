import { Community } from '@prisma/client'
import { useState } from 'react'
import { Btn } from 'zvijude/btns'
import { UploadBtn } from 'zvijude/cloudinary/upload'
import { Input } from 'zvijude/form'
import { getFormData } from 'zvijude/form/funcs'
import Title from 'zvijude/general/Title'
import Icon from 'zvijude/icon'
import { addCreator, updateCreator } from './db'

export default function CreatorsForm({
  creators,
  render,
  community,
}: {
  creators: CreatorType[]
  render: any
  community: Community
}) {
  const [state, setState] = useState(false) as any

  const removeCreator = (i, creator) => {
    if (!confirm(`האם להסיר את המרצה ${creator.firstName} ${creator.lastName}?`)) return
    creators.splice(i, 1)
    render()
  }

  return (
    <div>
      <div className='space-y-6'>
        <Title lbl='הוספת מרצים' icon='users' />

        <div className='space-y-4'>
          {creators.map((creator, i) => (
            <section key={i} className='flex items-center justify-between border rounded-md p-4 gap-4'>
              <div className='flex items-center gap-3'>
                <img className='w-11 h-11 rounded-md object-cover' src={creator.img} alt='' />
                <p className='font-semibold'>
                  {creator.firstName} {creator.lastName}
                </p>
              </div>

              <div className='flex gap-2'>
                <Btn
                  clr='icon'
                  icon='pen'
                  className='size-11'
                  type='button'
                  popoverTarget='creatorPop'
                  onClick={() => setState({ ...creator, i })}
                />
                <Btn clr='icon' icon='trash' className='size-11' type='button' onClick={() => removeCreator(i, creator)} />
              </div>
            </section>
          ))}
        </div>
      </div>

      <Btn lbl='הוסף יוצר' clr='text' type='button' popoverTarget='creatorPop' className='mt-4' />

      <CreatorPop render={render} creator={state} key={state?.i} creators={creators} community={community} />
    </div>
  )
}

function CreatorPop({ render, creator, creators, community }: CreatorPopType) {
  async function onSubmit(e) {
    const data = getFormData(e) as CreatorType

    if (creator) creators[creator.i] = { ...creator, ...data }
    else creators.push(data)
    if (community.id) {
      if (creator) await updateCreator(data, creator?.id)
      else await addCreator({ ...data, communityId: community.id })
    }

    render()
    document.getElementById('creatorPop')?.hidePopover()
    e.target.reset()
  }

  return (
    <form popover='manual' className='pop' id='creatorPop' onSubmit={onSubmit}>
      <section className='grid gap-3'>
        <Title lbl='הוספת מרצה' icon='user-plus' />
        <Input lbl='שם פרטי' name='firstName' defaultValue={creator?.firstName} />
        <Input lbl='שם משפחה' name='lastName' defaultValue={creator?.lastName} />

        <UploadBtn
          required
          defaultValue={creator?.img}
          className='bg-soft text-solid hover:bg-soft'
          icon={{ cls: 'bg-solid', type: 'reg' }}
          name='img'
        />

        <Btn lbl='שמירה' icon='floppy-disk' className='mt-4' />
      </section>

      <button type='button' className='absolute top-2 left-2' popoverTarget='creatorPop'>
        <Icon name='circle-xmark' type='sol' className='size-5' />
      </button>
    </form>
  )
}

type CreatorType = {
  firstName: string
  lastName: string
  img: string
}

type CreatorPopType = {
  render: () => void
  creator?: CreatorType & { i: number; id: string }
  creators: CreatorType[]
  community: Community
}
