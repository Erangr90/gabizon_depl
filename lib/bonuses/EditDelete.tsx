import Icon from 'zvijude/icon'
import { toast } from 'zvijude/pop'
import { redirect, useParams, usePathname, useRouter } from 'next/navigation'
import { deleteBonus } from './db/set'
import { Btn } from 'zvijude/btns'

export default function EditDelete({ item }) {
  const params = useParams()
  const { id } = params
  function onItem(item) {
    redirect(`/admin/${id}/bonuses/${item.id}`)
  }
  async function onDel() {
    if (!confirm('האם אתה בטוח שברצונך למחוק את הבונוס?')) return
    toast('loading')
    await deleteBonus(item.id, id)
    toast('success', 'הבונוס נמחק בהצלחה')
  }

  return (
    <div className='flex flex-nowrap'>
      <Btn clr='icon' icon='pen' onClick={() => onItem(item)} />
      <Btn clr='icon' icon='trash' onClick={onDel} />
    </div>
  )
}
