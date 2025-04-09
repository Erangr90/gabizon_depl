'use client'

import { redirect } from 'next/navigation'
import Icon from 'zvijude/icon'

export default function ClosePopBtn({ path }) {
  return (
    <button onClick={() => redirect(path)} className='absolute top-2 left-2 z-40'>
      <Icon name='circle-xmark' className='size-5' />
    </button>
  )
}
