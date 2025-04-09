// 'use client'
// import { ZoomMtg } from '@zoomus/websdk'
// import { useState } from 'react'
// import { generateZoomSignature } from './set'
// import dynamic from 'next/dynamic'

// export default function ZoomJoin() {
//   const ZoomMtg = dynamic(
//     async () => {
//       const { ZoomMtg } = await import('@zoomus/websdk')
//       return ZoomMtg
//     },
//     { ssr: false }
//   )

//   const [meetingNumber, setMeetingNumber] = useState('')
//   const [role, setRole] = useState(0)
//   const [signature, setSignature] = useState('')

//   function start() {
//     // ZoomMtg is available directly
//     ZoomMtg.preLoadWasm()
//     ZoomMtg.prepareJssdk()
//     ZoomMtg.init({
//       leaveUrl: 'https://your-site.com',
//       success: () => {
//         ZoomMtg.join({
//           signature,
//           sdkKey: process.env.NEXT_PUBLIC_ZOOM_CLIENT_ID,
//           meetingNumber,
//           userName: 'My Test User',
//           passWord: '',
//         })
//       },
//     })
//   }

//   async function getSignature() {
//     const sig = await generateZoomSignature(meetingNumber, role)
//     setSignature(sig)
//   }

//   return (
//     <div className='max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md'>
//       <h1 className='text-2xl font-bold text-center mb-6'>Zoom Signature Example</h1>

//       <div className='space-y-4'>
//         <div>
//           <label htmlFor='meetingNumber' className='block text-sm font-medium text-gray-700 mb-1'>
//             Meeting Number
//           </label>
//           <input
//             id='meetingNumber'
//             type='text'
//             placeholder='Enter meeting number'
//             value={meetingNumber}
//             onChange={(e) => setMeetingNumber(e.target.value)}
//             className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
//           />
//         </div>

//         <div>
//           <label htmlFor='role' className='block text-sm font-medium text-gray-700 mb-1'>
//             Role
//           </label>
//           <select
//             id='role'
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
//           >
//             <option value='0'>Attendee</option>
//             <option value='1'>Host</option>
//           </select>
//         </div>

//         <button
//           disabled={!meetingNumber}
//           onClick={getSignature}
//           className='w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
//         >
//           Get Signature
//         </button>

//         {signature && (
//           <div className='mt-4 p-4 bg-gray-100 rounded-md'>
//             <p className='font-medium mb-1'>Signature:</p>
//             <p className='text-sm break-all'>{signature}</p>
//             <p className='text-xs text-gray-500 mt-2'>Next: Pass this signature to ZoomMtg.join(...) to join the meeting</p>
//           </div>
//         )}

//         <button
//           disabled={!signature}
//           onClick={start}
//           className='w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
//         >
//           Join Meeting
//         </button>
//       </div>
//     </div>
//   )
// }
