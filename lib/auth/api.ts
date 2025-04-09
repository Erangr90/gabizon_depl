'use server'

import { redirect } from 'next/navigation'
import { encrypt } from 'zvijude/auth/funcs'
import { db } from '@/db/db'
import { getSmooveUser } from './smoove'
import { kdb } from '@/db/knex'
import { cookies } from 'next/headers'
import { daysFromNow } from 'zvijude/dates/funcs'
import { addUser } from '../users/db/set'

export async function checkNewUser(user) {
  // let userExist = await kdb('User').whereILike('email', user.email).first()
  const community = await kdb('Community').where({ id: user.communityId }).first()
  if (!community) return { msg: 'קוד קהילה שגוי', fail: true }

  const res = await getSmooveUser(user.email, community)
  if (!res) return { msg: 'אינך חבר בקהילה', fail: true }

  const userData = {
    firstName: res?.firstName,
    lastName: res?.lastName,
    email: res?.email,
  }

  await addUser(userData, user.communityId)
  await saveCoki(userData)

  redirect('/')
}

export async function checkUser(user) {
  const userExist = await kdb('User').whereILike('email', user.email).first()
  if (!userExist) return { msg: 'המשתמש לא קיים במערכת', fail: true }

  await saveCoki(userExist)
  redirect('/')

  // if (!userExist || userExist.role !== 'ADMIN') {
  //   if (user.communityId) {
  //     const community = await kdb('Community').where({ id: user.communityId })
  //     console.log('community: ', community)

  //     if (community.length > 0) {
  //       const res = await getContactByEmail(user.email, community[0])
  //       console.log('res: ', JSON.stringify(res))

  //       if (!res) return { msg: 'המשתמש לא קיים במערכת', fail: true }

  //       const userData = {
  //         firstName: res?.firstName,
  //         lastName: res?.lastName,
  //         email: res?.email,
  //       }
  //       console.log('userData: ', JSON.stringify(userData))

  //       await addUser(userData, user.communityId)
  //     }
  //   }
  // }

  // if (userExist && !userExist?.img) {
  //   userExist.img = user.picture

  //   db.user.update({
  //     where: { email: user.email },
  //     data: {
  //       img: user.picture,
  //     },
  //   })
  // }
}

export async function saveCoki(user: any) {
  const cokis = await cookies()
  const expires = daysFromNow(7)
  const userToken = await encrypt({ ...user, expires })
  cokis.set('user', userToken, { expires, httpOnly: true })
}
