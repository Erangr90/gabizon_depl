'use client'

import { getPosts } from '@/db/user/get'
import { Btn } from 'zvijude/btns'
import { Input } from 'zvijude/form'
import { getFormData } from 'zvijude/form/funcs'
import Icon from 'zvijude/icon'

export default function Buttom() {
  async function logPosts() {
    const posts = await getPosts()
  }

  function onSubmit(e) {
    e.preventDefault()
    const fd = new FormData(e.target)

    const data = {}
    fd.forEach((value, key) => {
      if (!value) return
      if (key.endsWith('[]')) {
        const arrayKey = key.slice(0, -2)
        if (!data[arrayKey]) data[arrayKey] = []
        data[arrayKey].push(value)
      } else data[key] = value
    })
  }

  return (
    <div>
      <form onSubmit={onSubmit} className='m-20'>
        <h3>Person 1:</h3>

        <label>First Name:</label>
        <input name='firstName' />

        <label>Last Name:</label>
        <input name='lastName' />

        <label>Email:</label>
        <input name='email' />

        {/* <MultiSelect
            id='colors'
            lbl='הוסף צבעים'
            selected={['צבע 1', 'צבע 2']}
            options={['צבע 1', 'צבע 2', 'צבע 3', 'צבע 4', 'צבע 5']}
          /> */}

        <section className='grid grid-cols-3 gap-4 items-end'>
          <MultiSelectObj
            id='colors'
            lbl='צבעים'
            show='color'
            val='id'
            selected={[{ id: 323, color: 'red', name: 'צבע 1' }]}
            options={[
              { id: 323, color: 'red', name: 'צבע 1' },
              { id: 324, color: 'blue', name: 'צבע 2' },
              { id: 325, color: 'green', name: 'צבע 3' },
            ]}
          />
          <Input lbl='צבע ראשי' />
        </section>

        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export function MultiSelectObj({ id, lbl, options, selected, val, show }: MultiSelectObjProps) {
  return (
    <BaseMultiSelect id={id} lbl={lbl} options={options}>
      {({ option }) => (
        <>
          <input
            name={`${id}[]`}
            type='checkbox'
            className='size-4 accent-solid'
            defaultChecked={selected.some((s) => s[val] === option[val])}
            value={option[val]}
          />
          <p>{option[show]}</p>
        </>
      )}
    </BaseMultiSelect>
  )
}

export function MultiSelect({ id, lbl, options, selected }: MultiSelectProps) {
  return (
    <BaseMultiSelect id={id} lbl={lbl} options={options}>
      {({ option }) => (
        <>
          <input
            name={`${id}[]`}
            type='checkbox'
            className='size-4 accent-solid'
            defaultChecked={selected.includes(option)}
            value={option}
          />
          <p>{option}</p>
        </>
      )}
    </BaseMultiSelect>
  )
}

type MultiSelectProps = {
  id: string
  lbl: string
  options: string[]
  selected: string[]
}

type MultiSelectObjProps = {
  id: string
  lbl: string
  options: Record<string, any>[]
  selected: Record<string, any>[]
  val: string
  show: string
}

function BaseMultiSelect({ id, lbl, options, children }) {
  const anchorName = '--' + id

  return (
    <>
      <button
        type='button'
        popoverTarget={id}
        className='flex justify-between border rounded-md shadow px-3 h-10 active:shadow-none'
        style={{ anchorName }}
      >
        <p>{lbl}</p>
        <Icon name='angle-down' className='size-4' />
      </button>

      <div
        popover='auto'
        id={id}
        className='popanchor border rounded-md shadow-xl min-w-40'
        style={{ positionAnchor: anchorName }}
      >
        {options?.map((option, i) => (
          <label key={i} className='flex px-3 py-1 gap-3 cursor-pointer'>
            {children({ option })}
          </label>
        ))}
      </div>
    </>
  )
}

declare module 'react' {
  interface CSSProperties {
    anchorName?: string
    positionAnchor?: string
  }
}

// export function MultiSelectObj({ id, lbl, options, selected, show, val }) {
//   const anchorName = '--' + id
//   const name = id + '[]'

//   return (
//     <div className='min-w-40 w-full'>
//       <button
//         type='button'
//         popoverTarget={id}
//         className='flex justify-between border rounded-md shadow px-3 h-10 active:shadow-none min-w-inherit w-inherit'
//         style={{ anchorName }}>
//         <p className=''>{lbl}</p>
//         <Icon name='angle-down' className='size-4' />
//       </button>

//       <div
//         popover='auto'
//         id={id}
//         className='popanchor border rounded-md shadow-xl py-2 min-w-inherit'
//         style={{ positionAnchor: anchorName }}>
//         {options?.map((option, i) => (
//           <label key={i} className='flex px-2 py-0.5 gap-3 cursor-pointer'>
//             <input
//               name={name}
//               type='checkbox'
//               className='size-4 accent-solid'
//               defaultChecked={selected.find((s) => s[val] == option[val])}
//               value={option[val]}
//             />
//             <p>{option[show]}</p>
//           </label>
//         ))}
//       </div>
//     </div>
//   )
// }

// function MultiSelect({ id, lbl, options, selected }) {
//   const anchorName = '--' + id
//   const name = id + '[]'
//   selected = new Set(selected)

//   return (
//     <>
//       <button
//         type='button'
//         popoverTarget={id}
//         className='flex justify-between border rounded-md shadow px-3 h-10 active:shadow-none'
//         style={{ anchorName }}>
//         <p className=''>{lbl}</p>
//         <Icon name='angle-down' className='size-4' />
//       </button>

//       <div
//         popover='auto'
//         id={id}
//         className='popanchor border rounded-md shadow-xl min-w-40'
//         style={{ positionAnchor: anchorName }}>
//         {options?.map((option, i) => (
//           <label key={i} className='flex px-3 py-1 gap-3 cursor-pointer'>
//             <input name={name} type='checkbox' className='size-4 accent-solid' defaultChecked={selected.has(option)} />
//             <p>{option}</p>
//           </label>
//         ))}
//       </div>
//     </>
//   )
// }

{
  /* <label className='flex px-3 py-1 gap-3 cursor-pointer'>
          <input name='colors[]' type='checkbox' className='size-4 accent-solid' />
          <p>כחול</p>
        </label>

        <label className='flex px-3 py-1 gap-3 cursor-pointer'>
          <input name='colors[]' type='checkbox' className='size-4 accent-solid' />
          <p>כחוsdffל</p>
        </label> */
}

{
  /* <Btn
        lbl='הוסף צבעים'
        icon='angle-down'
        className='flex-row-reverse justify-between'
        clr='text'
        size='small'
        popoverTarget={id}
        style={{ anchorName }}
      /> */
}
