'use client'

import { useState } from 'react'
import Search from 'zvijude/table/Search'
import Table, { ConfigT } from 'zvijude/table'
import { Btn } from 'zvijude/btns'
import EditDelete from './EditDelete'
import { redirect } from 'next/navigation'

export default function AdminMsgsTable({ data, communityId }) {
  const headers = [
    { key: 'title', label: 'נושא' },
    { key: 'desc', label: 'תיאור' },
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
      <div className="my-8">
        <div className="flex justify-between items-end mb-2">
          <Search config={config} />
          <Btn lbl="הוספת הודעה חדשה" icon="plus" onClick={() => redirect(`/admin/${communityId}/admin-msgs/0`)} />
        </div>
        <Table config={config} />
      </div>
    </>
  )
}
