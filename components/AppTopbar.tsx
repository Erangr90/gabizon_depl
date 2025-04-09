'use client'

// import { useUser } from '@/lib/hooks/useUser'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AppTopbar({ community, user }) {
  // Mock user data (replace with actual hook when available)

  const pathname = usePathname()
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours()
      if (hour >= 5 && hour < 12) {
        setGreeting('בוקר טוב')
      } else if (hour >= 12 && hour < 17) {
        setGreeting('צהריים טובים')
      } else {
        setGreeting('ערב טוב')
      }
    }

    updateGreeting()
    const interval = setInterval(updateGreeting, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  // Define the navigation links with their associated titles
  const navLinks = [
    {
      href: '/home',
      title: `${greeting}, ${user?.name || 'אורח'}`,
    },
    {
      href: '/library',
      title: 'ספרייה',
    },
    {
      href: '/saved',
      title: 'נשמרו',
    },
    {
      href: '/talks',
      title: 'מרחב קהילתי',
    },
    {
      href: '/user-msgs',
      title: 'שירות לקוחות',
    },
    {
      href: '/events',
      title: 'אירועים קרובים',
    },
    {
      href: '/bonuses',
      title: 'בונוסים',
    },
  ]

  // Get the current title based on the pathname
  const currentNav = navLinks.find((link) => pathname.includes(link.href))
  const title = currentNav?.title || ''

  return (
    <div className='flex bg-white justify-between w-full md:w-[calc(100%-240px)] items-center border-b px-4 py-4  fixed top-0 left-0 z-40'>
      {/* Display the title */}
      {title && <p className='text-2xl hidden md:block font-semibold'>{title}</p>}

      <div className='text-center md:hidden'>
        <img src={community?.img} alt='Logo' className='rounded-full  mx-auto size-8' />
      </div>

      {/* User avatar */}
      <div className='flex items-center gap-4'>
        <div className='relative w-8 h-8 overflow-hidden rounded-full'>
          {user?.img ? (
            <img src={user.img} alt={user?.name || 'User'} className='w-full h-full object-cover' />
          ) : (
            <div className='w-full h-full flex items-center justify-center text-gray-500 font-medium'>
              {user?.name?.[0] || 'א'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
