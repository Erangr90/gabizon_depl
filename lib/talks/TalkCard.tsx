import Link from 'next/link'
import Icon from 'zvijude/icon'

export default function TalkCard({ talk }) {
  const now = new Date().getTime()
  const start = new Date(talk.date).getTime()
  const end = new Date(talk.endTime).getTime()
  const isLive = now > start && now < end

  const formattedDate = new Date(talk.date).toLocaleDateString('he-IL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const formattedTime = new Date(talk.date).toLocaleTimeString('he-IL', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  const durationInMinutes = Math.round((new Date(talk.endTime).getTime() - new Date(talk.date).getTime()) / (1000 * 60))
  const endTime = new Date(talk.endTime).getTime()

  const isPassed = now > endTime

  return (
    <div className='max-w-3xl'>
      <div className='bg-white rounded-lg p-4 shadow-lg flex flex-col items-start gap-4 '>
        {!isLive ? (
          <div className='w-full'>
            <div className='justify-between flex'>
              <div>
                <h2 className='font-semibold text-xl text-gray-900 mb-1'>{talk.title}</h2>
                {!isPassed && (
                  <div className='flex text-sm mt-2 w-full justify-between gap-2'>
                    <div className='flex gap-2 items-end  text-solid font-semibold'>
                      <span>{formattedTime}</span>
                      <span>•</span>
                      <span>{formattedDate}</span>
                      <span>•</span>
                      <span>{durationInMinutes} דקות</span>
                    </div>
                  </div>
                )}
              </div>

              {isPassed ? (
                <div className='flex gap-2 rounded-full items-center font-semibold text-lg w-auto bg-gray-300 text-white px-4 py-1  no-underline transition-colors'>
                  דיון זה עבר
                </div>
              ) : (
                <div>
                  <Link
                    dir='ltr'
                    href={talk.link}
                    rel='noopener noreferrer'
                    className='flex gap-2 rounded-full items-center font-semibold text-lg w-auto bg-green-500 text-white px-4 py-1   hover:bg-green-600 transition-colors'
                  >
                    <Icon name='whatsapp' type='sol' className='size-5 bg-white' />
                    הצטרפות לדיון
                  </Link>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className='w-full'>
            <div className='justify-between flex'>
              <div>
                <h2 className='font-semibold text-xl text-gray-900 mb-1'>{talk.title}</h2>
                <div className='flex text-sm mt-2 w-full justify-between gap-2'>
                  <div className='flex gap-2 items-end  text-solid font-semibold'>
                    <span>{formattedTime}</span>
                    <span>•</span>
                    <span>{formattedDate}</span>
                    <span>•</span>
                    <span>{durationInMinutes} דקות</span>
                  </div>
                </div>
              </div>
              <div className='flex items-center font-semibold text-lg w-auto bg-red-500 text-white px-4 py-1 rounded-lg  no-underline hover:bg-red-600 transition-colors'>
                <Icon name='tower-broadcast' type='sol' className='size-4 bg-white' />
                LIVE
              </div>
              <p className='font-semibold'>הדיון מתקיים כעת, לחצו על הכפתור על מנת לעבור לאפליקציית Whatsapp ולהצטרף לדיון</p>

              <Link
                dir='ltr'
                href={talk.link}
                rel='noopener noreferrer'
                className='flex gap-2 rounded-full items-center font-semibold text-lg w-auto bg-green-500 text-white px-4 py-1  no-underline hover:bg-green-600 transition-colors'
              >
                <Icon name='whatsapp' type='sol' className='size-5 bg-white' />
                הצטרפות לדיון
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
