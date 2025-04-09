import { useRouter } from 'next/navigation'
import Link, { LinkProps } from 'next/link'
import React from 'react'

// Use PropsWithChildren to include 'children' automatically
interface CustomLinkProps extends LinkProps {
  onClick?: () => void // Optional onClick prop
  children: React.ReactNode
  className?: string
}

const CustomLink: React.FC<CustomLinkProps> = ({ href, onClick, children, className, ...props }) => {
  const router = useRouter()

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault()

    // Call the provided onClick prop if it's passed
    if (onClick) onClick()

    // Fade-out the current page
    const fadeOut = document.documentElement.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 250,
      easing: 'ease-in-out',
      fill: 'forwards',
    })

    // Start the page transition
    const transition = document.startViewTransition(async () => {
      // Push the new route while the fade-out animation is happening
      router.push(href.toString())
    })

    await fadeOut.finished
    // await transition.ready

    // slide-in the new page
    document.documentElement.animate(
      [
        { transform: 'translateX(100%)', opacity: 0 },
        { transform: 'translateX(0)', opacity: 1 },
      ],
      {
        duration: 250,
        easing: 'ease-in-out',
        fill: 'forwards',
      }
    )
  }

  return (
    <Link href={href} {...props} onClick={handleClick} className={className}>
      {children}
    </Link>
  )
}

export default CustomLink
