import { kdb } from '@/db/knex'
import { getCommunitiesByUserIdAndRole } from '@/lib/welcome/db'
import Link from 'next/link'
import React from 'react'
import { getUser } from 'zvijude/auth/funcs'
import Icon from 'zvijude/icon'

export default async function HomePage() {
  const user = await getUser()
  const userCommunities = await getCommunitiesByUserIdAndRole(user.id, user.role)

  // get all users that has a post today
  const res = await kdb.raw(`
  SELECT c.id as communityID, u.id as userID, u.notification ,p.date
  FROM "User" u, "Post" p, "Community" c
  where date(p.date) = CURRENT_DATE and c.id = ANY(u.community_ids)`)

  console.log('res', res.rows)

  return (
    <div className='min-h-screen  bg-bg_main_color'>
      <div className='max-w-6xl mx-auto px-4 py-8'>
        <header className='mb-12'>
          <div className='flex flex-col sm:flex-row justify-between items-center gap-4'>
            <h1 className='text-4xl font-bold text-center sm:text-left text-gray-800 bg-gradient-to-r from-solid to-solid/80 bg-clip-text text-transparent'>
              ברוך שובך, {user.name}
            </h1>
            <div className='flex items-center gap-4'>
              <span
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  user.role === 'ADMIN' ? 'bg-soft text-black' : 'bg-gray-200 text-gray-800'
                }`}
              >
                {user.role === 'ADMIN' ? 'מנהל' : 'משתמש'}
              </span>
              {user.role === 'ADMIN' && (
                <Link
                  href='/create-community'
                  className='inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 bg-gradient-to-r from-solid to-solid/80 rounded-full shadow-lg hover:shadow-xl hover:scale-105'
                >
                  צור קהילה
                  <Icon name='plus' className='bg-white' type='sol' />
                </Link>
              )}
            </div>
          </div>
        </header>

        <main>
          <h2 className='text-3xl font-semibold text-gray-700 mb-8 text-center sm:text-right'>הקהילות שלך</h2>
          {userCommunities.length > 0 ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
              {userCommunities?.map((community, index) => (
                <div
                  key={community.id}
                  className='group w-full max-w-xs mx-auto overflow-hidden border-2 border-gray-200 shadow-xl transition-all duration-300 hover:shadow-2xl rounded-xl bg-white/90 backdrop-blur hover:bg-white'
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className='relative h-48 overflow-hidden rounded-t-xl'>
                    <img
                      src={community.img}
                      alt={community.name}
                      className='w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                  </div>
                  <div className='p-6 space-y-6'>
                    <h3
                      className='text-2xl text-center font-bold transition-colors duration-300'
                      style={{ color: community.solid }}
                    >
                      {community.name}
                    </h3>
                    <div className='flex flex-col gap-4'>
                      <Link href={`/${community.id}/home`} className='w-full'>
                        <button
                          className='w-full px-6 py-3 rounded-full text-white transition-all duration-300 hover:scale-105 hover:shadow-lg flex gap-2 items-center justify-center'
                          style={{ backgroundColor: community.solid }}
                        >
                          <span>מעבר לקהילה</span>
                          <Icon name='arrow-left' className='bg-white' />
                        </button>
                      </Link>
                      {user.role === 'ADMIN' && (
                        <Link href={`/admin/${community.id}/library`} className='w-full'>
                          <button className='w-full px-6 py-3 rounded-full text-white transition-all duration-300 hover:scale-105 hover:shadow-lg flex gap-2 items-center justify-center bg-gradient-to-tr from-solid to-solid/80'>
                            <span>ניהול קהילה</span>
                            <Icon name='arrow-left' className='bg-white' />
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='p-8 text-center bg-white/90 backdrop-blur rounded-xl shadow-lg max-w-2xl mx-auto'>
              <h3 className='text-3xl font-bold text-gray-800 mb-4'>אתה לא שייך לאף קהילה</h3>
              <p className='text-gray-600'>צור קשר עם מנהל המערכת כדי להצטרף לקהילה או ליצור קהילה חדשה.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
