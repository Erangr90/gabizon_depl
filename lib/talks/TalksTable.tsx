'use client'

import { useState } from 'react'
import Search from 'zvijude/table/Search'
import Table, { ConfigT } from 'zvijude/table'
import { Btn } from 'zvijude/btns'
import { redirect } from 'next/navigation'
import EditDelete from './EditDelete'

export default function TalksTable({ data, communityId }) {
  const headers = [
    { key: 'title', label: 'נושא' },
    { key: 'date', label: 'תאריך ושעת התחלה', format: 'formatDateTime' },
    {
      key: 'endTime',
      label: 'תאריך ושעת סיום',
      format: 'formatDate',
    },
    {
      key: 'link',
      label: 'לינק',
    },
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
          <Btn lbl='הוספת דיון חדש' icon='plus' onClick={() => redirect(`/admin/${communityId}/talks/0`)} />
        </div>
        <Table config={config} />
      </div>
    </>
  )
}
