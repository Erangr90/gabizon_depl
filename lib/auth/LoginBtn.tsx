'use client'

import Script from 'next/script'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'zvijude/pop'
import { checkUser } from './api'

declare global {
  const google: any
}

export default function LoginBtn() {
  const client_id = process.env.NEXT_PUBLIC_GGLID

  async function callback(gglUser) {
    toast('loading')
    let user = null as any
    try {
      user = jwtDecode(gglUser.credential)
      const res = await checkUser(user)

      if (res?.fail) toast('error', res.msg)
    } catch (error) {
      console.log('error', error)
    }
  }

  function initGoogle() {
    google.accounts.id.initialize({
      client_id,
      callback,
    })

    document.getElementsByName('gglBtn').forEach((el) =>
      google.accounts.id.renderButton(el, {
        width: 250,
      })
    )
  }

  return (
    <div className='absolute bottom-4 right-4 opacity-60'>
      <p className='text-slate-800'>כניסה לאדמין</p>
      <button name='gglBtn' />

      <Script src='https://accounts.google.com/gsi/client' onLoad={initGoogle} strategy='lazyOnload' />
    </div>
  )
}

function TitleSlash({ lbl }) {
  return (
    <div className='mt-5 mb-4 text-center '>
      <div className='h-px w-full bg-slate-300' />
      <div className='mx-auto -mt-[13px]'>
        <span className='bg-gradient-to-r from-transparent via-white to-transparent px-12'>
          <span className='bg-white'>{lbl}</span>
        </span>
      </div>
    </div>
  )
}
