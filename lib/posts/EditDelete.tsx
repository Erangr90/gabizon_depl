import Icon from 'zvijude/icon'
import { toast } from 'zvijude/pop'
import { redirect, useParams, usePathname, useRouter } from 'next/navigation'
import { deletePost } from './db/set'
import { Btn } from 'zvijude/btns'

export default function EditDelete({ item }) {
  const params = useParams()
  const { id } = params
  function onItem(item) {
    const filter = { postId: item.id }
    redirect(`?filter=${JSON.stringify(filter)}`)
  }
  async function onDel() {
    if (!confirm('האם אתה בטוח שברצונך למחוק את השיעור?')) return
    toast('loading')
    await deletePost(item.id, id)
    toast('success', 'השיעור נמחק בהצלחה')
  }

  return (
    <td className='flex flex-nowrap'>
      <Btn clr='icon' icon='pen' onClick={() => onItem(item)} />
      <Btn clr='icon' icon='trash' onClick={onDel} />
    </td>
  )
}
