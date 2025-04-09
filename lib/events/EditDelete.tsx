import { toast } from 'zvijude/pop'
import { redirect, useParams } from 'next/navigation'
import { Btn } from 'zvijude/btns'
import { deleteEvent } from './db/set'

export default function EditDelete({ item }) {
  const params = useParams()
  const { id } = params

  function onItem(item) {
    redirect(`/admin/${id}/events/${item.id}`)
  }
  async function onDel() {
    if (!confirm('האם אתה בטוח שברצונך למחוק את האירוע?')) return
    toast('loading')
    await deleteEvent(item.id, id)
    toast('success', 'האירוע נמחק בהצלחה')
  }

  return (
    <td className='flex flex-nowrap'>
      <Btn clr='icon' icon='pen' onClick={() => onItem(item)} />
      <Btn clr='icon' icon='trash' onClick={onDel} />
    </td>
  )
}
