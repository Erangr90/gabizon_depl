import Icon from 'zvijude/icon'
import { toast } from 'zvijude/pop'
import { redirect, useParams } from 'next/navigation'
import { deleteTalk } from './db/set'
import { Btn } from 'zvijude/btns'

export default function EditDelete({ item }) {
  const params = useParams()
  const { id } = params
  function onItem(item) {
    redirect(`/admin/${id}/talks/${item.id}`)
  }
  async function onDel() {
    if (!confirm('האם אתה בטוח שברצונך למחוק את הדיון?')) return
    toast('loading')
    await deleteTalk(item.id, id)
    toast('success', 'הדיון נמחק בהצלחה')
  }

  return (
    <td className="flex flex-nowrap">
      <Btn clr="icon" icon="pen" onClick={() => onItem(item)} />
      <Btn clr="icon" icon="trash" onClick={onDel} />
    </td>
  )
}
