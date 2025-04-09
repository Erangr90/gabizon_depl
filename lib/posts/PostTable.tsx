'use client'

import { useState } from 'react'
import Search from 'zvijude/table/Search'
import Table, { ConfigT } from 'zvijude/table'
import { Btn } from 'zvijude/btns'
import PostPop from './PostPop'
import EditDelete from './EditDelete'
import { redirect } from 'next/navigation'

export default function PostTable({ data, communityId }) {
  const headers = [
    { key: 'creator.firstName', label: 'מרצה' },
    { key: 'title', label: 'נושא' },
    {
      key: 'date',
      label: 'תאריך ושעת התחלה',
      format: 'formatDate',
    },
    {
      key: 'endTime',
      label: 'תאריך ושעת סיום',
      format: 'formatDate',
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
          <div className='flex'>
            <Search config={config} />
            <Btn lbl='סינון' icon='filter' clr='text' popoverTarget='filterPosts' />
          </div>
          <div className='flex'>
            <Btn lbl='שיעורים מהעבר' clr='text' href={`/admin/${communityId}/library?filter={"past":"on"}`} />
            <Btn lbl='שיעורים מהעתיד' clr='text' href={`/admin/${communityId}/library?filter={"upcoming":"on"}`} />
            <Btn lbl='הוספת שיעור חדש' icon='plus' onClick={() => redirect(`?filter={"postId":"0"}`)} />
          </div>
        </div>
        <Table config={config} />
      </div>
    </>
  )
}
