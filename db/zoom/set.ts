'use server'
import crypto from 'crypto'

// Ensure secure environment variables
const sdkKey = process.env.ZOOM_CLIENT_ID
const sdkSecret = process.env.ZOOM_CLIENT_SECRET as any

if (!sdkKey || !sdkSecret) {
  throw new Error('Missing ZOOM_CLIENT_ID or ZOOM_CLIENT_SECRET environment variables.')
}

export async function generateZoomSignature(meetingNumber: string, role: number) {
  if (!meetingNumber || role === undefined) {
    throw new Error('meetingNumber and role are required.')
  }

  const timestamp = new Date().getTime() - 30000
  const msg = Buffer.from(`${sdkKey}${meetingNumber}${timestamp}${role}`).toString('base64')
  const hash = crypto.createHmac('sha256', sdkSecret).update(msg).digest('base64')
  const rawSignature = `${sdkKey}.${meetingNumber}.${timestamp}.${role}.${hash}`
  const signature = Buffer.from(rawSignature).toString('base64')

  return signature
}
