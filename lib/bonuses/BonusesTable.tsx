'use client'

import { useState } from 'react'
import Search from 'zvijude/table/Search'
import Table, { ConfigT } from 'zvijude/table'
import { Btn } from 'zvijude/btns'
import { redirect } from 'next/navigation'
import EditDelete from './EditDelete'

export default function BonusesTable({ data, communityId }) {
  const headers = [
    { key: 'title', label: 'נושא' },
    { key: 'postsTitles', label: 'פוסטים' },
  ]

  const [state, setState] = useState(
    data.map((bonus) => ({
      ...bonus,
      postsTitles: bonus.posts.map((post) => post.title).join(', '),
    }))
  )

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
    data: state,
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
          <Btn lbl='הוספת בונוס חדש' icon='plus' onClick={() => redirect(`/admin/${communityId}/bonuses/0`)} />
        </div>
        <Table config={config} />
      </div>
    </>
  )
}
