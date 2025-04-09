'use client'

import { useState } from 'react'
import Search from 'zvijude/table/Search'
import Table, { ConfigT } from 'zvijude/table'
import { Btn } from 'zvijude/btns'
import { redirect } from 'next/navigation'
import EditDelete from './EditDelete'

export default function PostTable({ data, communityId }) {
  const headers = [
    { key: 'name', label: 'שם מלא' },
    { key: 'phone', label: 'טלפון' },
    { key: 'email', label: 'אימייל' },
    { key: 'age', label: 'גיל' },
    { key: 'createdAt', label: 'תאריך הצטרפות', format: 'formatDate' },
    { key: 'origin', label: 'מקור' },
    { key: 'status', label: 'סטטוס' },
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
          <div className="flex">
            <Search config={config} />
            <Btn lbl="סינון" icon="filter" clr="text" popoverTarget="filterUsers" />
          </div>
          <Btn lbl="הוספת משתמש חדש" icon="plus" onClick={() => redirect(`/admin/${communityId}/users/0`)} />
        </div>
        <Table config={config} />
      </div>
    </>
  )
}
