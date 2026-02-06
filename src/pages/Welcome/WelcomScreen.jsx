import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import './welcomeScreen.scss';
import { getTodayPageId } from '../../utils/dateHelpers';
import api from '../../api/axios';

const WelcomScreen = () => {
	const [form, setForm] = useState({
		email: '',
		password: ''
	});
	const navigate = useNavigate();
	const today = new Date();
	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await api.post('/auth/login', form);

			// Save token
			localStorage.setItem('token', res.data.token);
			localStorage.setItem('user', JSON.stringify(res.data.user));

			// Redirect to journal
			window.location.href = `/journal-page/${getTodayPageId(today)}`;
		} catch (err) {
			alert(err.response?.data?.message || 'Login failed');
		}
	};

	return (
		<div id="login">
			<div className="journal-container">
				<h2 className="journal-title">Welcome Back</h2>

				<form className="journal-form" onSubmit={handleSubmit}>
					<div className="input-group">
						<input className="input-field" type="text" name="email" required placeholder=" " onChange={handleChange} />
						<label className="input-label">email</label>
					</div>

					<div className="input-group">
						<input className="input-field" type="password" name="password" required placeholder=" " onChange={handleChange} />
						<label className="input-label">Password</label>
					</div>

					<Button btnClass="submit-btn" btnValue="Login"></Button>
				</form>
				<Button
					btnClass="register-btn"
					btnValue="Register"
					btnOnClick={() => {
						navigate('/journal-register');
					}}
				></Button>
			</div>
		</div>
	);
};

export default WelcomScreen;
