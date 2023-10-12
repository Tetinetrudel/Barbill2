const apiURL = 'http:s://barbill-api.onrender.com'

export const fetchUserInfo = async (id) => {
    try {
      const res = await fetch(`${apiURL}/${id}`)  
      return res.json()
    } catch (error) {
        throw new Error(error)
    }
}

export const fetchUpdateUser = async (id, formData) => {
  try {
    const res = await fetch(`${apiURL}/${id}`, {
      method: 'PATCH',
      body: formData
    })
    return res.json()
  } catch (error) {
    throw new Error(error)
  }
}