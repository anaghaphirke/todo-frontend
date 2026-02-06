import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { formatDate } from '../../utils/dateHelpers';
import './journalForm.scss';

const EMPTY_FORM = {
	whatsonyourmind: '',
	howwasyesterday: '',
	mood: '',
	day_rating: '',
	energy_level: 1,
	stress_level: 1,
	todo_list: '',
	win_of_the_day: '',
	challenge_today: '',
	gratitude: '',
	date: ''
};
const JournalForm = ({ onSubmit, defaultValues, curentPageId }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting }
	} = useForm();

	const isReadOnly = !!defaultValues;

	const [location, setLocation] = useState('');
	useEffect(() => {
		if (defaultValues) {
			reset({
				whatsonyourmind: defaultValues.whats_on_your_mind || '',
				howwasyesterday: defaultValues.how_was_yesterday || '',
				mood: defaultValues.mood || '',
				day_rating: defaultValues.day_rating ? String(defaultValues.day_rating) : '',
				energy_level: defaultValues.energy_level || 1,
				stress_level: defaultValues.stress_level || 1,
				todo_list: defaultValues.todo_list || '',
				win_of_the_day: defaultValues.win_of_the_day || '',
				challenge_today: defaultValues.challenge_today || '',
				gratitude: defaultValues.gratitude || '',
				date: formatDate(defaultValues.page_id || curentPageId)
			});
			setLocation(defaultValues.location || '');
		} else {
			reset({
				...EMPTY_FORM,
				date: formatDate(curentPageId)
			});

			setLocation('');
		}
	}, [defaultValues, curentPageId, reset]);

	const getLocation = () => {
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				setLocation(`${pos.coords.latitude}, ${pos.coords.longitude}`);
			},
			() => alert('Location permission denied')
		);
	};

	return (
		<div className="journal-container">
			<h1 className="journal-title">✨ Today's Journal ✨</h1>
			<form onSubmit={handleSubmit(onSubmit)} className="journal-form">
				{/* ROW 1 */}
				<div className="form-row">
					<div className="input-group">
						<textarea {...register('whatsonyourmind', { required: 'Required' })} className={`input-field ${errors.whatsonyourmind ? 'error' : ''}`} rows="3" placeholder=" " disabled={isReadOnly} />
						<label className="input-label">What is on your mind?</label>
						{errors.whatsonyourmind && <p className="error-text">{errors.whatsonyourmind.message}</p>}
					</div>

					<div className="input-group">
						<textarea {...register('howwasyesterday')} className="input-field" rows="3" placeholder=" " disabled={isReadOnly} />
						<label className="input-label">How was yesterday?</label>
					</div>
				</div>

				{/* ROW 2 */}
				<div className="form-row">
					<div className="input-group">
						<select {...register('mood', { required: 'Select mood' })} className={`input-field ${errors.mood ? 'error' : ''}`} disabled={isReadOnly}>
							<option value=""></option>
							<option value="happy">😊 Happy</option>
							<option value="sad">😔 Sad</option>
							<option value="excited">🤩 Excited</option>
							<option value="calm">😌 Calm</option>
							<option value="tired">🥱 Tired</option>
						</select>
						<label className="input-label">Mood</label>
						{errors.mood && <p className="error-text">{errors.mood.message}</p>}
					</div>

					<div className="input-group">
						<select {...register('day_rating')} className="input-field" disabled={isReadOnly}>
							<option value=""></option>
							<option value="1">⭐</option>
							<option value="2">⭐⭐</option>
							<option value="3">⭐⭐⭐</option>
							<option value="4">⭐⭐⭐⭐</option>
							<option value="5">⭐⭐⭐⭐⭐</option>
						</select>
						<label className="input-label">Day Rating</label>
					</div>
				</div>

				{/* ROW 3 */}
				<div className="form-row">
					<div className="slider-group">
						<label>🔋 Energy Level</label>
						<input type="range" min="1" max="5" {...register('energy_level')} disabled={isReadOnly} />
					</div>

					<div className="slider-group">
						<label>😵‍💫 Stress Level</label>
						<input type="range" min="1" max="5" {...register('stress_level')} disabled={isReadOnly} />
					</div>
				</div>

				{/* ROW 4 */}
				<div className="form-row">
					<div className="input-group">
						<textarea {...register('todo_list')} className="input-field" rows="3" placeholder=" " disabled={isReadOnly} />
						<label className="input-label">Todo List</label>
					</div>

					<div className="input-group">
						<textarea {...register('win_of_the_day')} className="input-field" rows="3" placeholder=" " disabled={isReadOnly} />
						<label className="input-label">⭐ One win today</label>
					</div>
				</div>

				{/* ROW 5 */}
				<div className="form-row">
					<div className="input-group">
						<textarea {...register('challenge_today')} className="input-field" rows="2" placeholder=" " disabled={isReadOnly} />
						<label className="input-label">⚡ One challenge</label>
					</div>

					<div className="input-group">
						<textarea {...register('gratitude')} className="input-field" rows="2" placeholder=" " disabled={isReadOnly} />
						<label className="input-label">🙏 Gratitude</label>
					</div>
				</div>

				{/* ROW 6 */}
				<div className="form-row">
					<div className="file-box">
						<label>📸 Photo</label>
						<input type="file" accept="image/*" {...register('photo')} disabled={isReadOnly} />
						{defaultValues?.photo && <img src={`http://localhost:5000/uploads/${defaultValues.photo}`} alt="Saved" />}
					</div>

					<div className="file-box">
						<label>🎤 Voice Note</label>
						<input type="file" accept="audio/*" {...register('voiceNote')} disabled={isReadOnly} />
            {defaultValues?.voice_note && (
  <audio
    controls
    src={`http://localhost:5000/uploads/${defaultValues.voice_note}`}
  />
)}
					</div>
				</div>

				{/* ROW 7 */}
				<div className="form-row">
					<div className="location-box">
						<input value={location} readOnly placeholder="Fetch location" disabled={isReadOnly} />
						<button type="button" onClick={getLocation}>
							📍
						</button>
					</div>

					<div className="input-group">
						<input {...register('date')} className="input-field" readOnly />
						<label className="input-label">Date</label>
					</div>
				</div>

				{/* SUBMIT */}
				<button type="submit" disabled={isSubmitting || isReadOnly} className="submit-btn">
					{isSubmitting ? 'Saving...' : 'Save Entry 💖'}
				</button>
			</form>
		</div>
	);
};

export default JournalForm;
