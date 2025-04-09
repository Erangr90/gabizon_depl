import PopMsg from 'zvijude/pop'
import './global.css'
import { Metadata } from 'next'
import { Assistant } from 'next/font/google'

const font = Assistant({ subsets: ['hebrew'], weight: ['400', '600', '700'], display: 'swap' })

export const metadata: Metadata = {
  title: 'Gabizon',
  description: 'Mennage your community',
  category: 'Personal',
  keywords: 'community, management, events, communication',
  icons: {
    icon: 'https://res.cloudinary.com/dfletli2x/image/upload/icons/reg/users.svg',
    shortcut: 'https://res.cloudinary.com/dfletli2x/image/upload/icons/reg/users.svg',
    apple: 'https://res.cloudinary.com/dfletli2x/image/upload/icons/reg/users.svg',
  },
  openGraph: {
    type: 'website',
    title: 'Gabizon',
    description: 'Mennage your community',
    url: 'https://yourwebsite.com',
    siteName: 'Gabizon',
    images: [
      {
        url: 'https://res.cloudinary.com/dfletli2x/image/upload/icons/reg/users.svg',
        width: 300,
        height: 300,
        alt: 'Gabizon Icon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gabizon',
    description: 'Mennage your community',
    images: ['https://res.cloudinary.com/dfletli2x/image/upload/icons/reg/users.svg'],
  },
}

export default async function GlobalLayout({ children }) {
  // const user = await getUser()

  return (
    <html lang='he' dir='rtl'>
      <body className={font.className}>
        <PopMsg />
        {children}
      </body>
    </html>
  )
}
