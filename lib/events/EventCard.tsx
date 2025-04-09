'use client'
import React from 'react'
import { Btn } from 'zvijude/btns'

export function EventCard({ event }) {
  const formattedDate = new Date(event.date).toLocaleDateString('he-IL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const formattedTime = new Date(event.date).toLocaleTimeString('he-IL', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  const durationInMinutes = Math.round((new Date(event.endTime).getTime() - new Date(event.date).getTime()) / (1000 * 60))

  const now = new Date().getTime()
  const endTime = new Date(event.endTime).getTime()

  const isPassed = now > endTime

  return (
    <div className='w-full overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white'>
      <div className='relative'>
        <img src={event.img} alt={event.title} className='w-full h-48 object-cover' />
        <div className='absolute top-2 right-2'>
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${
              event.isOnline ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
            }`}
          >
            {event.isOnline ? 'אירוע אונליין' : 'אירוע פרונטלי'}
          </span>
        </div>
      </div>
      <div className='p-4'>
        <h2 className='text-2xl font-semibold mb-2 text-gray-800'>{event.title}</h2>
        <p className='text-gray-600 font-semibold '>{event.desc}</p>
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
      {isPassed ? (
        <div className='p-4 bg-gray-50 flex justify-between font-semibold'>אירוע זה עבר</div>
      ) : (
        <div className='p-4 bg-gray-50 flex justify-between'>
          {event.link && <Btn lbl='פרטים נוספים' onClick={() => window.open(event.link, '_blank', 'noopener noreferrer')} />}
          {event.payLink && (
            <Btn lbl='תשלום לאירוע' onClick={() => window.open(event.payLink, '_blank', 'noopener noreferrer')} />
          )}
        </div>
      )}
    </div>
  )
}
