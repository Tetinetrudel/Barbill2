import React from 'react'
import { Link } from 'react-router-dom'

import { BiExclude } from 'react-icons/bi'

import LoginForm from '../../../features/auth/LoginForm'

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
            <p>Vous n'avez pas d'accompte ? <Link to='/register' className="text-link">S'inscrire</Link></p>
          </div>
        </div>
        <LoginForm />
      </div>
    </div>
    
  )
}

export default Login