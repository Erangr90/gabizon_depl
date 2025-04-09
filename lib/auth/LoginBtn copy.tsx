// 'use client'

// import Script from 'next/script'
// import { jwtDecode } from 'jwt-decode'
// import { toast } from 'zvijude/pop'
// import { Input } from 'zvijude/form'
// import { useState } from 'react'
// import { Btn } from 'zvijude/btns'
// import { getFormData } from 'zvijude/form/funcs'
// import { checkNewUser, checkUser } from './api'

// declare global {
//   const google: any
// }

// export default function LoginBtn() {
//   const client_id = process.env.NEXT_PUBLIC_GGLID

//   async function callback(gglUser) {
//     toast('loading')
//     let user = null as any
//     try {
//       user = jwtDecode(gglUser.credential)
//       const res = await checkUser(user)

//       if (res?.fail) toast('error', res.msg)
//     } catch (error) {
//       console.log('error', error)
//     }
//   }

//   function initGoogle() {
//     google.accounts.id.initialize({
//       client_id,
//       callback,
//     })

//     document.getElementsByName('gglBtn').forEach((el) =>
//       google.accounts.id.renderButton(el, {
//         width: 250,
//       })
//     )
//   }

//   async function handleEmailLogin() {}

//   async function onNewUser(e) {
//     toast('loading')
//     const data = getFormData(e)
//     const res = await checkNewUser(data)
//     res?.fail ? toast('error', 'משתמש לא קיים') : toast('success', 'החשבון נוצר בהצלחה')
//   }

//   return (
//     <div className='grid gap-14 desktop:grid-cols-[1fr,auto,1fr]'>
//       <div>
//         <p className='text-lg border-b pb-1 border-slate-400 mb-3 font-semibold'>משתמש קיים</p>
//         <button name='gglBtn' />

//         <TitleSlash lbl='או' />

//         <form className='grid gap-4'>
//           <Input lbl='מייל' name='email' dir='ltr' />
//           <Btn lbl='התחברות' onClick={handleEmailLogin} />
//         </form>
//       </div>

//       <div className='h-full w-px bg-slate-300 mobile:hidden' />

//       <div>
//         <p className='text-lg border-b pb-1 border-slate-400 mb-3 font-semibold'>משתמש חדש</p>
//         <form className='grid gap-4' onSubmit={onNewUser}>
//           <Input lbl='קוד קהילה' name='communityId' />
//           <Input lbl='מייל' name='email' dir='ltr' type='email' />
//           <Btn lbl='יצירת חשבון' onClick={handleEmailLogin} />
//         </form>
//       </div>

//       <Script src='https://accounts.google.com/gsi/client' onLoad={initGoogle} strategy='lazyOnload' />
//     </div>
//   )
// }

// function TitleSlash({ lbl }) {
//   return (
//     <div className='mt-5 mb-4 text-center '>
//       <div className='h-px w-full bg-slate-300' />
//       <div className='mx-auto -mt-[13px]'>
//         <span className='bg-gradient-to-r from-transparent via-white to-transparent px-12'>
//           <span className='bg-white'>{lbl}</span>
//         </span>
//       </div>
//     </div>
//   )
// }
