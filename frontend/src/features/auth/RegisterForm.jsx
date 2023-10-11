import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { fetchRegister } from '../../api/auth/Auth'

import '../../pages/auth/Auth.css'

const RegisterForm = () => {
  const navigate = useNavigate()

  const [company, setCompany] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if(!company || !email || !password || !confirmPassword) {
        setError('Tous les champs doivent être complétés')
        return
      }
      const result = await fetchRegister(company, email, password, confirmPassword)
      if (result.success) {
        navigate('/login')
      } else {
        setError(result.message)
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='form'>
      <div className="form-group">
        <input 
          type="company" 
          className='form-input' 
          autoComplete='off' 
          placeholder=" " 
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <label htmlFor="company" className='form-label'>Compagnie</label>
      </div>
      <div className="form-group">
        <input 
          type="email" 
          className='form-input' 
          autoComplete='off' 
          placeholder=" " 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="email" className='form-label'>Email</label>
      </div>
      <div className="form-group">
        <input 
          type="password" 
          className='form-input' 
          autoComplete='off' 
          placeholder=" " 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="password" className='form-label'>Mot de passe</label>
      </div>
      <div className="form-group">
        <input 
          type="password" 
          className='form-input' 
          autoComplete='off' 
          placeholder=" " 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <label htmlFor="confirmPassword" className='form-label'>Confirmation mot de passe</label>
      </div>
      <div className="form-group">
        {error && <p className='error-message'>*{error}</p>}
        <button type='submit' className='btn btn-blue' style={{ marginTop: '10px' }}>S'inscrire</button>
      </div>
    </form>
  )
}

export default RegisterForm