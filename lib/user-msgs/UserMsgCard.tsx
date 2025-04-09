interface UserMsgCardProps {
  msg: {
    id: number
    title: string
    desc: string
    status: 'NEW' | 'PENDING' | 'COMPLETED' | 'CANCELED'
    answer: string | null
    createdAt: Date
  }
}

const statusColors = {
  NEW: 'bg-blue-500',
  PENDING: 'bg-yellow-500',
  COMPLETED: 'bg-green-500',
  CANCELED: 'bg-red-500',
}

const statusTranslations = {
  NEW: 'בטיפול',
  PENDING: 'בטיפול',
  COMPLETED: 'טופל',
  CANCELED: 'בוטל',
}

function formatDate(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) {
    return `לפני ${days} ימים`
  } else if (hours > 0) {
    return `לפני ${hours} שעות`
  } else if (minutes > 0) {
    return `לפני ${minutes} דקות`
  } else {
    return 'לפני זמן קצר'
  }
}

export function UserMsgCard({ msg }: UserMsgCardProps) {
  return (
    <div className='w-full mb-4 max-w-2xl border bg-white  border-gray-200 rounded-lg overflow-hidden'>
      <div className='p-4'>
        <div className='flex items-center justify-between mb-2'>
          <h3 className='text-lg font-bold'>{msg.title}</h3>
          <span className={`${statusColors[msg.status]} text-white px-2 py-1 rounded-full text-sm`}>
            {statusTranslations[msg.status]}
          </span>
        </div>
        <p className='text-sm text-gray-500 mb-2'>{formatDate(new Date(msg.createdAt))}</p>
        <p className='text-sm'>{msg.desc}</p>
      </div>
      {msg.answer && (
        <div className='bg-gray-100 p-4 border-t border-gray-200'>
          <h4 className='font-semibold mb-2'>תשובה ממנהל:</h4>
          <p className='text-sm'>{msg.answer}</p>
        </div>
      )}
    </div>
  )
}
