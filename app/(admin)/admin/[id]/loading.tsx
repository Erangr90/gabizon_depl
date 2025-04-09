import Icon from 'zvijude/icon'

export default function Loading() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <Icon name='loader' className='animate-spin text-primary size-28 bg-black/40' />
    </div>
  )
}
