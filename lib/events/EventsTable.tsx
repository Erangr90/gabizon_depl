'use client'

import { useState } from 'react'
import Search from 'zvijude/table/Search'
import Table, { ConfigT } from 'zvijude/table'
import { Btn } from 'zvijude/btns'
import { redirect } from 'next/navigation'
import EditDelete from './EditDelete'

export default function EventsTable({ data, communityId }) {
  const headers = [
    { key: 'title', label: 'כותרת' },
    { key: 'date', label: 'תאריך', format: 'formatDateTime' },
    { key: 'endTime', label: 'תאריך', format: 'formatDateTime' },
    { key: 'loc', label: 'מיקום' },
  ]

  const [state, setState] = useState(data)

  const [columns, setColumns] = useState(headers)

  function moreRows(item) {
    return <EditDelete item={item} />
  }

  function moreHeads() {
    return <th>עריכה / מחיקה</th>
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
          <Btn lbl='הוספת אירוע חדש' icon='plus' onClick={() => redirect(`/admin/${communityId}/events/0`)} />
        </div>
        <Table config={config} key={Math.random()} />
      </div>
    </>
  )
}
