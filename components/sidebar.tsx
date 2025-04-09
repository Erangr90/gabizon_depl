'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logout } from 'zvijude/auth/funcs'
import Icon, { IconNames } from 'zvijude/icon'

export default function Sidebar({ community, user }) {
  const communityId = community?.id
  const pathname = usePathname()

  async function handleLogout() {
    console.log('here')
    await logout()
  }

  const navLinks = [
    {
      icon: 'book',
      href: `/admin/${communityId}/library`,
      title: 'ניהול ספריה',
    },
    {
      icon: 'user',
      href: `/admin/${communityId}/users`,
      title: 'ניהול משתמשים',
    },
    {
      icon: 'calendar',
      href: `/admin/${communityId}/events`,
      title: 'ניהול אירועים',
    },
    {
      icon: 'comment',
      href: `/admin/${communityId}/admin-msgs`,
      title: 'הודעות מערכת',
      flip: true,
    },
    {
      icon: 'phone',
      href: `/admin/${communityId}/user-msgs`,
      title: 'פניות שירות',
      flip: true,
    },
    {
      icon: 'book-heart',
      href: `/admin/${communityId}/bonuses`,
      title: 'בונוסים',
    },
    {
      icon: 'messages',
      href: `/admin/${communityId}/talks`,
      title: 'מרחב קהילתי',
    },
    {
      icon: 'album',
      href: `/admin/${communityId}/community-managment`,
      title: 'ניהול קהילה',
    },
  ] as navLinksT

  return (
    <main className='w-60 py-6 fixed bg-white shadow-lg inline-flex flex-col justify-between h-screen'>
      <div className='text-center'>
        <img src={community?.img} alt='Logo' className='rounded-full mb-2 mx-auto size-16' />
        <h2 className='font-semibold text-lg'>{community?.name}</h2>
      </div>

      {/* Menu Items */}
      <div className='mt-6'>
        {navLinks.map((link) => (
          <Link
            key={link.title}
            href={link.href}
            className={`flex w-full py-4 px-6 border-r-4 border-white
                    ${pathname.includes(link.href) ? 'bg-slate-100 !border-solid' : ''}
                `}
          >
            <Icon
              flip={link.flip}
              name={link.icon}
              type={`${pathname.includes(link.href) ? 'sol' : 'reg'}`}
              className='bg-solid size-4'
            />
            <p className=''>{link.title}</p>
          </Link>
        ))}
      </div>

      <div className='mb-4 self-start flex-grow flex flex-col justify-end'>
        <div className='flex items-center gap-6 mr-6'>
          <Icon name='user' type='reg' className='size-4' />
          <p>שלום {user.name}</p>
        </div>
        <div onClick={handleLogout} className='flex items-center gap-6 mr-6 cursor-pointer'>
          <Icon name='arrow-right-from-bracket' type='reg' className='size-4' />
          <p>התנתקות</p>
        </div>
        <Link href='/' className='flex items-center gap-6 mr-6'>
          <Icon name='arrow-right' type='reg' className='size-4' />
          <p className='ml-2'>בחזרה לקהילות</p>
        </Link>
      </div>
    </main>
  )
}

type navLinksT = {
  icon: IconNames
  href: string
  title: string
  flip?: boolean
}[]
