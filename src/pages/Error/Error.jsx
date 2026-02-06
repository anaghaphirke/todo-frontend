import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button'
import './error.scss'

const Error = ({message}) => {
  const navigate = useNavigate();

  const goToLogin = () => {
    localStorage.removeItem('token');
    navigate('/')
  }

  return (
    <div className='error-page'>
      <div className='error-page__container'>
        <h2>Session Expired</h2>
      <p>{message ||  'Your session has expired or the page does not exist.'}</p> 
      <Button btnClass='submit-btn' btnValue='Login Again' btnOnClick={goToLogin}></Button>     
      </div>
      
    </div>
  )
}

export default Error
