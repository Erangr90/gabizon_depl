import axios from 'axios'
// const API_KEY = '3a3a68a5-cf80-441a-b8d0-dc3a9113cb96'
// const EMAIL = 'tovalec1@gmail.com'

export async function getSmooveUser(email, community) {
  const url = 'https://rest.smoove.io/v1/Contacts'
  const params = {
    fields: 'id,externalid,email,cellphone,firstname,lastname',
    page: 1,
    itemsPerPage: 100,
    sort: '-id',
    includeLinkedLists: true,
    'q.email.like': email,
  }

  const response = await axios
    .get(url, {
      params,
      headers: {
        Authorization: `Bearer ${community?.smooveApiKey}`,
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      console.log(error.message)
    })

  if (response?.data?.length > 0 && response?.data[0]?.lists_Linked?.includes(community?.smooveListId)) return response?.data[0]
  return null
}

// https://rest.smoove.io/v1/Contacts?fields=id%2Cexternalid%2Cemail%2Ccellphone%2Cfirstname%2Clastname%2CtimestampSignup%2ClastChanged&page=1&itemsPerPage=100&sort=-id&includeCustomFields=false&includeLinkedLists=false&q.email.like=tovalec1%40gmail.com

export async function getSmvUserList() {}
