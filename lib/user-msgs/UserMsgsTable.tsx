'use client'

import { useState } from 'react'
import Search from 'zvijude/table/Search'
import Table, { ConfigT } from 'zvijude/table'

import EditDelete from './EditDelete'
import { format } from 'path'

export default function UserMsgsTable({ data, communityId }) {
  const headers = [
    { key: 'title', label: 'נושא ההודעה' },
    { key: 'desc', label: 'תיאור ההודעה' },
    { key: 'status', label: 'סטטוס' },
    { key: 'contact.name', label: 'משתמש' },
    { key: 'createdAt', label: 'תאריך שליחה', format: 'formatDateTime' },
  ]

  const [state, setState] = useState(data)

  const [columns, setColumns] = useState(headers)

  function moreRows(item) {
    return <EditDelete item={item} />
  }

  function moreHeads() {
    return <th>תגובת מנהל</th>
  }

  const config = {
    columns,
    setColumns,
    data,
    state,
    setState,
    moreHeads,
    moreRows,
  } as ConfigT

  return (
    <>
      <div className='my-8'>
        <div className='flex justify-between items-end mb-2'>
          <Search config={config} />
          {/* <Btn lbl="הוספת פנייה חדשה" icon="plus" onClick={() => redirect(`/admin/${communityId}/user-msgs/0`)} /> */}
        </div>
        <Table config={config} />
      </div>
    </>
  )
}
