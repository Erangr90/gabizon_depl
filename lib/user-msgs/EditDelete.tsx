import Icon from 'zvijude/icon'
import { toast } from 'zvijude/pop'
import { redirect, useParams } from 'next/navigation'
import { Btn } from 'zvijude/btns'
import { deleteUserMsg } from './db/set'

export default function EditDelete({ item }) {
  const params = useParams()
  const { id } = params
  function onItem(item) {
    redirect(`/admin/${id}/user-msgs/${item.id}`)
  }
  async function onDel() {
    if (!confirm('האם אתה בטוח שברצונך למחוק את הפנייה?')) return
    toast('loading')
    await deleteUserMsg(item.id, id)
    toast('success', 'המשתמש נמחק בהצלחה')
  }

  return (
    <td className='flex flex-nowrap'>
      <Btn clr='icon' icon='message' onClick={() => onItem(item)} />
      {/* <Btn clr="icon" icon="trash" onClick={onDel} /> */}
    </td>
  )
}
