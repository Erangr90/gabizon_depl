import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function CommunitiesSection({ communities }) {
  return (
    <section className='py-12 px-4 bg-gray-100'>
      <div className='container mx-auto'>
        <h1 className='text-4xl font-bold mb-8 text-center'>קהילות</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {communities.map((community) => (
            <div
              key={community.id}
              className='bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out transform hover:-translate-y-2'
              style={{ backgroundColor: community.bg }}
            >
              <div className='relative h-48'>
                <Image
                  src={community.img}
                  alt={community.name}
                  layout='fill'
                  objectFit='cover'
                  className='transition-opacity duration-300 ease-in-out group-hover:opacity-75'
                />
              </div>
              <div className='p-6'>
                <h2 className='text-2xl font-semibold mb-4' style={{ color: community.solid }}>
                  {community.name}
                </h2>
                <div className='space-y-2 mb-4'>
                  {community.creators.slice(0, 3).map((creator, index) => (
                    <div key={index} className='flex items-center space-x-3'>
                      <div className='relative w-10 h-10 rounded-full overflow-hidden'>
                        <Image
                          src={creator.img}
                          alt={`${creator.firstName} ${creator.lastName}`}
                          layout='fill'
                          objectFit='cover'
                        />
                      </div>
                      <span className='text-sm font-medium'>
                        {creator.firstName} {creator.lastName}
                      </span>
                    </div>
                  ))}
                </div>
                <Link
                  href={`/admin/${community.id}/library`}
                  className='inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300'
                >
                  מעבר לקהילה
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
