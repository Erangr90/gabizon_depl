'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logout } from 'zvijude/auth/funcs'
import Icon, { IconNames } from 'zvijude/icon'

export default function AppSidebar({ community, user }) {
  const communityId = community?.id
  const pathname = usePathname()

  const navLinks = [
    {
      icon: 'house-medical',
      href: `/${communityId}/home`,
      title: 'בית',
    },
    {
      icon: 'book',
      href: `/${communityId}/library`,
      title: 'ספרייה',
    },
    {
      icon: 'bookmark',
      href: `/${communityId}/saved`,
      title: 'נשמרו',
    },
    {
      icon: 'messages',
      href: `/${communityId}/talks`,
      title: 'מרחב קהילתי',
    },
    {
      icon: 'phone',
      href: `/${communityId}/user-msgs`,
      title: 'שירות לקוחות',
    },
    {
      icon: 'calendar',
      href: `/${communityId}/events`,
      title: 'אירועים קרובים',
    },
    {
      icon: 'book-heart',
      href: `/${communityId}/bonuses`,
      title: 'בונוסים',
    },
  ] as navLinksT

  async function handleLogout() {
    console.log('here')
    await logout()
  }

  return (
    <div className='hidden md:block'>
      <main className=' w-60 py-6 fixed bg-white shadow-lg inline-flex flex-col justify-between h-screen '>
        <div className='text-center'>
          <img src={community?.img} alt='Logo' className='rounded-full mb-2 mx-auto size-16' />
          <h2 className='font-semibold text-lg'>{community?.name}</h2>
        </div>

        {/* Menu Items */}
        <div className='mt-6'>
          {navLinks.map((link) => (
            <div key={link.title}>
              {link.title === 'מרחב קהילתי' && (
                <p className='w-full my-4 mx-5 border-r-4 border-white text-sm mt-12 text-gray-500'>פעולות </p>
              )}
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
            </div>
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
            <p>בחזרה לקהילות</p>
          </Link>
        </div>
      </main>
    </div>
  )
}

type navLinksT = {
  icon: IconNames
  href: string
  title: string
  flip?: boolean
}[]
