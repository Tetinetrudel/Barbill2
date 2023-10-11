import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { setLogin } from '../../reducers/auth/Auth'
import { fetchLogin } from '../../api/auth/Auth'

import '../../pages/auth/Auth.css'

const LoginForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if(!email || !password) {
        setError('Tous les champs doivent être complétés')
        return
      }
      const result = await fetchLogin(email, password)
      if (result.success) {
        dispatch(setLogin(result))
        navigate('/clients')
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
        <label htmlFor="password" className='form-label'>Password</label>
      </div>
      <div className="form-group">
        {error && <p className='error-message'>*{error}</p>}
        <button type='submit' className='btn btn-blue' style={{ marginTop: '10px' }}>Se connecter</button>
      </div>
    </form>
  )
}

export default LoginForm