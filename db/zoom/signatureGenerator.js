// signatureGenerator.js

import crypto from 'crypto'

export function generateSignature(sdkKey, sdkSecret, meetingNumber, role) {
  const timestamp = new Date().getTime() - 30000
  const msg = Buffer.from(sdkKey + meetingNumber + timestamp + role).toString('base64')
  const hash = crypto.createHmac('sha256', sdkSecret).update(msg).digest('base64')
  const signature = Buffer.from(`${sdkKey}.${meetingNumber}.${timestamp}.${role}.${hash}`).toString('base64')

  return signature
}
