import { twMerge } from 'tailwind-merge'
import ClosePopBtn from './ClosePopBtn'

export default function Pop({ children, className = '', closePath }: Props) {
  return (
    <div className='fade-in size-full fixed z-50 bg-black/10 top-0 left-0 grid place-items-center backdrop-blur-[2px]'>
      <div className={twMerge('relative p-6 bg-white rounded-lg shadow-xl scale-in', className)}>
        {closePath && <ClosePopBtn path={closePath} />}

        {children}
      </div>
    </div>
  )
}

type Props = {
  children: React.ReactNode
  className?: string
  closePath?: string
}
