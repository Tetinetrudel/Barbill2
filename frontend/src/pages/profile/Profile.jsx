import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { fetchUserInfo, fetchUpdateUser, fetchUpdateUserPassword } from '../../api/users/Users'

import './Profile.css'
import ProfileInfo from '../../features/profile/ProfileInfo'
import ProfileSecurity from '../../features/profile/ProfileSecurity'

const Profile = () => {

  const [isUpdateCompany, setIsUpdateCompany] = useState(false)
  const [isUpdateEmail, setIsUpdateEmail] = useState(false)
  const [isUpdatePassword, setIsUpdatePassword] = useState(false)

  const [company, setCompany] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [error, setError] = useState("")
  const [isUpdated, setIsUpdated] = useState(false)
  const { id } = useParams()

  const handleGetUser = async () => {
    const result = await fetchUserInfo(id)
    if(result.success) {
      setCompany(result.user.company)
      setEmail(result.user.email)
    } else {
      setError(result.message)
    }
  }

  useEffect(() => {
    handleGetUser()
  }, [id, isUpdated])

  const handleSubmitPassword = async (e) => {
    e.preventDefault()
    const payload = { company, email, password, newPassword }
    
    const result = await fetchUpdateUserPassword(id, payload) 
    if(result.success) {
      setPassword("")
      setNewPassword("")
      setIsUpdatePassword(!isUpdatePassword)
    } else {
      setError(result.message)
    }
  }

  const handleSubmitUpdateUser = async (e) => {
    e.preventDefault()
    const payload = { company, email }
    setIsUpdated(!isUpdated)
    const result = await fetchUpdateUser(id, payload) 
    if(result.success) {
      setCompany("")
      setEmail("")
      setIsUpdated(false)
      setIsUpdateCompany(false)
      setIsUpdateEmail(false)
    } else {
      setError(result.message)
    }
  }

  const props = {
    isUpdateCompany, setIsUpdateCompany, isUpdateEmail, setIsUpdateEmail, company, setCompany, email, setEmail,
    password, setPassword, newPassword, setNewPassword, error, setError, isUpdated, setIsUpdated, id, handleSubmitPassword,
    isUpdatePassword, setIsUpdatePassword, handleSubmitUpdateUser
   }

  return (
    <main className='profile-section'>
      <ProfileInfo props={props} />
      <ProfileSecurity props={props} />
    </main>
  )
}

export default Profile