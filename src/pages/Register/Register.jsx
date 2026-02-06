import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modals/Modal.jsx';
import './register.scss';
import api from '../../api/axios.js';

const Register = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [duplicateUser, isDuplicateUser] = useState(false);
  const [showAPIError, setShowAPIError] = useState()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    navigate('/');
  };

  const registerUser = (data) => {
    api.post('/auth/register', data).then((res) => {
      console.log(res)
      navigate('/')
    }).catch((err) => {
      console.log(err)
      isDuplicateUser(true);
      setShowAPIError(err.response.data.message)

    });
  };
  const navigate = useNavigate();

  return (
    <Modal isOpen={isModalOpen} onClose={toggleModal} modalClass="register-modal">
      <div className="register-modal__content">
        <button className="modal-close" onClick={toggleModal}>
          ×
        </button>

        <h2 className="register-modal__title">Create your journal</h2>

        <form className="register-form" onSubmit={handleSubmit(registerUser)}>
          {/* Row 1 */}
          <div className="form-row">
            <div className="input-group">
              <input {...register('name', { required: 'Required' })} type="text" className={`input-field ${errors.name ? 'error' : ''}`} placeholder=" " />
              <label className="input-label">Name</label>
              {errors.name && <p className="error-text">{errors.name.message}</p>}
            </div>

            <div className="input-group">
              <input type="email" {...register('email', { required: 'Required' })} className={`input-field ${errors.email ? 'error' : ''}`} placeholder=" " />
              <label className="input-label">Email</label>
              {errors.email && <p className="error-text">{errors.email.message}</p>}
            </div>
          </div>
          {/* Row 2 */}
          <div className="form-row">
            <div className="input-group">
              <input type="password" {...register('password', { required: 'Required' })} className={`input-field ${errors.password ? 'error' : ''}`} placeholder=" " />
              <label className="input-label">Password</label>
              {errors.password && <p className="error-text">{errors.password.message}</p>}
            </div>

            <div className="input-group">
              <input type="password" {...register('confirmPassowrd', {
                required: 'Required', validate: {
                  checkPassword: async (confirmPassowrd, { password }) => {
                    if (!password) return 'Password is needed';
                    if (password !== confirmPassowrd) return 'Not matching with Passowrd'
                  }
                }
              })} className={`input-field ${errors.confirmPassowrd ? 'error' : ''}`} placeholder=" " />
              <label className="input-label">Confirm password</label>
              {errors.confirmPassowrd && <p className="error-text">{errors.confirmPassowrd.message}</p>}
            </div>
          </div>
          {/* Row 3 */}
          <div className="form-row">

            <div className="input-group">
              <label className="input-label-static">Journaling goals</label>

              <div className="checkbox-group">
                {[
                  'Mental health',
                  'Productivity',
                  'Gratitude',
                  'Self reflection'
                ].map((goal) => (
                  <label key={goal} className="checkbox-item">
                    <input
                      type="checkbox"
                      value={goal}
                      {...register('journalingGoal', {
                        required: 'Required',
                        validate: (value) =>
                          value?.length > 0 || 'Select at least one goal'
                      })}
                    />
                    <span>{goal}</span>
                  </label>
                ))}
              </div>

              {errors.journalingGoal && (
                <span className="error-text">
                  {errors.journalingGoal.message}
                </span>
              )}
            </div>
          </div>
          {/* Full width row */}
          <button type="submit" disabled={isSubmitting} className="submit-btn">
            {isSubmitting ? 'Saving...' : 'Register💖'}
          </button>{' '}
        </form>
        {duplicateUser ? (<span className="error-text api-error">{showAPIError}</span>) : '' }
      </div>
    </Modal>
  );
};

export default Register;
