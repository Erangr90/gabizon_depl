import { getUserMsgsByUserId } from '@/lib/user-msgs/db/get'
import { SendUserMsg } from '@/lib/user-msgs/SendUserMsg'
import { UserMsgCard } from '@/lib/user-msgs/UserMsgCard'
import { getUser } from 'zvijude/auth/funcs'
import Icon from 'zvijude/icon'

export default async function page({ params, searchParams }) {
  const { id } = await params
  const user = await getUser()
  const userId = user.id
  const msg = await searchParams?.msg
  const userMsgs = await getUserMsgsByUserId(userId)

  return (
    <main className='bg-bg_main_color min-h-screen px-4 md:px-8 pb-32 md:pb-8 pt-20'>
      <h1 className='text-4xl font-semibold mb-4 text-center md:text-right'>צריכים עזרה?</h1>
      <div className='text-center md:text-right mb-4'>
        <p>תוכלו לחייג אלינו, או לפתוח פנייה</p>
        <p>שירותי התמיכה שלנו הם בימים א-ה בשעות 9:00-15:00</p>
      </div>
      <SendUserMsg communityId={id} userId={userId} />
      {msg && (
        <div className='flex gap-2 items-center justify-center md:justify-normal mt-12'>
          <p className={`${msg === 'success' ? 'text-green-500' : 'text-red-500'} font-semibold text-2xl`}>
            {msg === 'success' ? 'הפנייה נשלחה בהצלחה!' : 'שגיאה: אירעה תקלה בשליחת הפנייה.'}
          </p>
          <Icon
            name={msg === 'success' ? 'check' : 'exclamation'}
            className={`size-5 ${msg === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
          />
        </div>
      )}

      {userMsgs && userMsgs.length > 0 && (
        <div className='mt-12'>
          <h2 className='text-2xl font-semibold mb-4 text-center md:text-right'>פניות אחרונות</h2>
          <div className='space-y-4'>
            {userMsgs.map((msg) => (
              <UserMsgCard key={msg.id} msg={msg} />
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
