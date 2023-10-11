import React from 'react'
import { Link } from 'react-router-dom'

import { BiExclude } from 'react-icons/bi'

import RegisterForm from '../../../features/auth/RegisterForm'

import '../Auth.css'

const Login = () => {

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-header">
          <div className="auth-logo">
            <BiExclude />
            <h1>Barbill</h1>
          </div>
          <div className="auth-header-content">
            <h2>Connection</h2>
            <p>Vous avez déjà un accompte ? <Link to='/login' className="text-link">Se connecter</Link></p>
          </div>
        </div>
        <RegisterForm />
      </div>
    </div>
    
  )
}

export default Login