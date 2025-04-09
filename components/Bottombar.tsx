'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Icon, { IconNames } from 'zvijude/icon'
import CustomLink from './customLink'

function NavLink({
  link,
  pathname,
  onClick,
  communityId,
}: {
  link
  pathname: string
  onClick?: () => void
  communityId: string
}) {
  const href = `/${communityId}${link.href}`

  return (
    <CustomLink className='flex flex-col items-center gap-1 p-2' href={href} onClick={onClick}>
      <Icon flip={link.flip} name={link.icon} type={pathname.includes(href) ? 'sol' : 'reg'} className='bg-solid size-4' />
      <span className={`text-sm font-semibold ${pathname.includes(href) ? 'text-solid' : 'text-gray-500'}`}>{link.title}</span>
    </CustomLink>
  )
}

export default function Bottombar({ communityId }: { communityId: string }) {
  const pathname = usePathname()
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpanded = () => setIsExpanded(!isExpanded)

  const mainNavLinks = [
    {
      icon: 'house-medical',
      href: '/home',
      title: 'בית',
    },
    {
      icon: 'book',
      href: '/library',
      title: 'ספרייה',
    },
    {
      icon: 'bookmark',
      href: '/saved',
      title: 'נשמרו',
    },
  ]

  const expandedNavLinks = [
    {
      icon: 'messages',
      href: '/talks',
      title: 'מרחב קהילתי',
    },
    {
      icon: 'phone',
      href: '/user-msgs',
      title: 'שירות לקוחות',
    },
    {
      icon: 'calendar',
      href: '/events',
      title: 'אירועים קרובים',
    },
    {
      icon: 'book-heart',
      href: '/bonuses',
      title: 'בונוסים',
    },
  ]

  return (
    <>
      <div className='md:hidden fixed bottom-0 left-0 right-0 border-t bg-white'>
        <nav className='flex items-center justify-around p-2 rtl' dir='rtl'>
          {mainNavLinks.map((link) => (
            <NavLink key={link.href} link={link} pathname={pathname} communityId={communityId} />
          ))}
          <button onClick={toggleExpanded} className='flex flex-col items-center gap-1 p-2'>
            <Icon name='plus' type='reg' className='bg-solid size-4' />
            <span className=' text-gray-500 text-sm font-semibold'>פעולות</span>
          </button>
        </nav>
      </div>
      {isExpanded && (
        <div className='fixed inset-0 bg-white z-50 overflow-y-auto'>
          <div className='flex flex-col items-center justify-center min-h-screen p-4 rtl' dir='rtl'>
            <h2 className='text-2xl font-bold mb-6 '>פעולות נוספות</h2>
            {expandedNavLinks.map((link) => (
              <NavLink key={link.href} link={link} pathname={pathname} onClick={toggleExpanded} communityId={communityId} />
            ))}
            <button onClick={toggleExpanded} className='mt-6 px-4 py-2 bg-gray-200 rounded-md text-gray-800'>
              סגור
            </button>
          </div>
        </div>
      )}
    </>
  )
}
