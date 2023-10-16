import { apiURL } from '../../utils/apiRoute'

export const fetchUserInfo = async (id) => {
    try {
      const res = await fetch(`${apiURL}/users/${id}`)  
      return res.json()
    } catch (error) {
        throw new Error(error)
    }
}

export const fetchUpdateUserPassword = async (id, payload) => {
  const { company, email, password, newPassword } = payload
  try {
    const res = await fetch(`${apiURL}/users/${id}/update-password`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ company, email, password, newPassword })
    })
    return res.json()
  } catch (error) {
    throw new Error(error)
  }
}

export const fetchUpdateUser = async (id, payload) => {
  const { company, email } = payload
  try {
    const res = await fetch(`${apiURL}/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ company, email })
    })
    return res.json()
  } catch (error) {
    throw new Error(error)
  }
}