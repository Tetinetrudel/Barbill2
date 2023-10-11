import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUpdateUser } from '../../reducers/auth/Auth'

import { fetchUserInfo, fetchUpdateUser } from '../../api/users/Users'

const Profile = () => {
  const dispatch = useDispatch()
  const [picture, setPicture] = useState("null")
  const [company, setCompany] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isUpdated, setIsUpdated] = useState(false)
  const { id } = useParams()

  const handleGetUser = async () => {
    const result = await fetchUserInfo(id)
    if(result.success) {
      setCompany(result.user.company)
      setEmail(result.user.email)
      setPicture(result.user.picture)
    } else {
      setError(result.message)
    }
  }

  useEffect(() => {
    handleGetUser()
  }, [id, isUpdated])


  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0]
    setPicture(selectedFile)
  }

  const handleSubmitPicture = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("picture", picture)
    formData.append("company", company)
    formData.append("email", email)
    
    const result = await fetchUpdateUser(id, formData) 
    if(result.success) {
      console.log(result.updateUser)

    } else {
      setError(result.message)
    }
  }

  return (
    <main>
      <form encType="multipart/form-data">
        <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="file" accept="image/*" onChange={handleImageChange}  />
        <button onClick={(e) => handleSubmitPicture(e)}>Submit</button>
      </form>
      
    </main>
  )
}

export default Profile