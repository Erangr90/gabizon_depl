'use client'

import { useState } from 'react'
import { MultiSelectObj, Switch } from 'zvijude/form'

function SendTo({ users, adminMsg }) {
  const isAll = adminMsg?.all ?? true

  const [all, setAll] = useState<boolean>(isAll)

  return (
    <div className='flex  h-16 '>
      <Switch name='all' checked={all} onChange={() => setAll(!all)} lbl='שליחה לכל המשתמשים' />

      {!all && (
        <MultiSelectObj
          placeholder='בחירת נמענים'
          options={users}
          id='users'
          show='name'
          val='id'
          selected={adminMsg?.users || []}
        />
      )}
    </div>
  )
}

export default SendTo
