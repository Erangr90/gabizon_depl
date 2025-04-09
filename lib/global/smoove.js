import axios from 'axios'

const API_KEY = '3a3a68a5-cf80-441a-b8d0-dc3a9113cb96'
// const API_KEY = '5a68e383-44c2-42b5-8de1-444406233471'
const EMAIL = 'tovalec1@gmail.com'

async function getContactByEmail(email) {
  const url = 'https://rest.smoove.io/v1/Contacts/elishakvatzim2@gmail.com'
  const params = {
    fields: 'id,externalid,email,cellphone,firstname,lastname',
    by: 'email',
    includeLinkedLists: true,
  }

  const response = await axios
    .get(url, {
      params,
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      console.log(error.message)
    })

  console.log(response?.data)
}

getContactByEmail(EMAIL)

// https://rest.smoove.io/v1/Contacts?fields=id%2Cexternalid%2Cemail%2Ccellphone%2Cfirstname%2Clastname%2CtimestampSignup%2ClastChanged&page=1&itemsPerPage=100&sort=-id&includeCustomFields=false&includeLinkedLists=false

// https://rest.smoove.io/v1/Contacts?fields=id%2Cexternalid%2Cemail%2Ccellphone%2Cfirstname%2Clastname%2CtimestampSignup%2ClastChanged&page=1&itemsPerPage=100&sort=-id&includeCustomFields=false&includeLinkedLists=false&q.email.like=tovalec1%40gmail.com
