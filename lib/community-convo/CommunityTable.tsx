'use client'

import { useState } from 'react'
import Search from 'zvijude/table/Search'
import Table, { ConfigT } from 'zvijude/table'
import { Btn } from 'zvijude/btns'

export default function CommunityTable({ data }) {
  
  const headers = [
    { key: 'title', label: 'נושא' },
  ]

  const [state, setState] = useState(data)

  const [columns, setColumns] = useState(headers)

  const config = {
    columns,
    setColumns,
    lsId: 'CommTable123',
    data,
    state,
    setState,
  } as ConfigT

  return (
    <>
      <div className="my-8">
        <div className="flex justify-between items-end mb-2">
          <Search config={config} />
        </div>
        <Table config={config} />
      </div>
    </>
  )
}
