'use server'

export async function getZoomAccessToken() {
  const clientId = process.env.ZOOM_CLIENT_ID
  const clientSecret = process.env.ZOOM_CLIENT_SECRET
  const accountId = process.env.ZOOM_ACCOUNT_ID

  const base64Auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

  // Request a new token
  const response = await fetch(`https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${accountId}`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${base64Auth}`,
    },
  })

  const data = await response.json()

  // Return just the access token
  return data.access_token
}

export async function getRecordings(userEmail) {
  // Get the access token dynamically
  const accessToken = await getZoomAccessToken()

  // Call the Zoom API
  const res = await fetch(`https://api.zoom.us/v2/users/${userEmail}/recordings`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  })

  // Return the response as JSON
  const recordingsData = await res.json()

  return recordingsData
}
