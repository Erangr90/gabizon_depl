import React from 'react'
// import { getServiceMsg } from './db/get'

export default async function ServiceConversation({ msgId }) {
  //   // Todo: How/where to store the msgs themselves? Should it be in another model?
  //   const msg = await getServiceMsg(msgId)
  //   const formatDate = (dateString: Date) => {
  //       const date = new Date(dateString);
  //       const formattedDate = new Intl.DateTimeFormat('he-IL', {
  //         day: '2-digit',
  //         month: '2-digit',
  //         year: 'numeric',
  //         hour: '2-digit',
  //         minute: '2-digit'
  //       }).format(date);
  //       const [datePart, timePart] = formattedDate.split(', ')
  //       return `התקבל ב${datePart} בשעה ${timePart}`
  //     };
  // return ( msg &&
  //   <section>
  //       <p className='text-xl font-semibold'>{msg.title}</p>
  //       <p className='text-base'>{formatDate(msg.createdAt)}</p>
  //       <div className='w-full'>
  //           <div className='flex flex-row'>
  //               <span className='font-bold'>{msg.contact.name}</span>
  //               <span className='p-2 text-sm bg-slate-400 rounded-md'>{msg.contact.status}</span>
  //           </div>
  //           <div className='card bg-white w-full rounded-lg shadow-lg p-5'>
  //           </div>
  //       </div>
  //   </section>
  // )
}
