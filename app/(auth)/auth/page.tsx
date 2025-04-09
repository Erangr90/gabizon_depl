import CommunityCode from '@/lib/auth/CommunityCode'
import LoginBtn from '@/lib/auth/LoginBtn'

export default async function page({ searchParams }) {
  const { errCode } = await searchParams
  console.log('errCode: ', errCode)

  return (
    <div className='grid grid-cols-2 w-screen bg-white place-items-center mobile:grid-cols-1 mobile:mt-24'>
      <div className='grid place-items-center gap-6'>
        {errCode && (
          <p className='text-red-700 text-lg'>
            <span className='text-2xl'>*</span> קוד קהילה שגוי: {errCode}
          </p>
        )}

        <h1 className='text-5xl font-bold mobile:text-3xl mb-8'>
          ברוכים הבאים ל <span className='text-solid'>Gabizon</span>
        </h1>
        <CommunityCode />
      </div>

      <img src='auth_bg.png' alt='' className='w-full h-screen mobile:hidden' />
      <LoginBtn />
    </div>
  )
}

// import CreateUserPopover from '@/lib/users/CreateUserPopover'
// import { Input } from 'zvijude/form'

{
  /* <div>
  <p className='text-lg mb-px'>יצירת חשבון חדש</p>
  <button className='baseBtn border h-11 rounded w-60' popoverTarget='createUser'>
    צור חשבון
  </button>
  <CreateUserPopover />
</div> */
}
