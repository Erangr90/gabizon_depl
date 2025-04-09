import Icon from 'zvijude/icon'
import { toast } from 'zvijude/pop'
import { redirect, useParams, usePathname, useRouter } from 'next/navigation'
import { deleteAdminMsg } from './db/set'
import { Btn } from 'zvijude/btns'

export default function EditDelete({ item }) {
  const params = useParams()
  const { id } = params
  function onItem(item) {
    redirect(`/admin/${id}/admin-msgs/${item.id}`)
  }
  async function onDel() {
    if (!confirm('האם אתה בטוח שברצונך למחוק את ההודעה?')) return
    toast('loading')
    await deleteAdminMsg(item.id, id)
    toast('success', 'ההודעה נמחקה בהצלחה')
  }

  return (
    <td className="flex flex-nowrap">
      <Btn clr="icon" icon="pen" onClick={() => onItem(item)} />
      <Btn clr="icon" icon="trash" onClick={onDel} />
    </td>
  )
}
