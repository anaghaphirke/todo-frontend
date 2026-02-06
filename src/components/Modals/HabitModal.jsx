import React from 'react';
import Modal from '../../components/Modals/Modal';
import { useForm, useFieldArray } from 'react-hook-form';
import './HabitModal.scss';
import Button from '../Button/Button';
import api from '../../api/axios';

const HabitModal = ({ isModalOpen, onClose,fetchHabits }) => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors }
	} = useForm({
		defaultValues: {
			habits: [{ name: '' }]
		}
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'habits'
	});

	const onSubmit = (data) => {
    api.post('/habits',data).then(() => {
      onClose();
      fetchHabits();
    });
    
	};

	return (
		<Modal isOpen={isModalOpen} modalClass="habits-modal">
       <button className="habits-modal__close" onClick={onClose}>
          ×
        </button>
			<form onSubmit={handleSubmit(onSubmit)} className="habit-form">
				{fields.map((field, index) => (
					<div key={field.id} className="habit-input-row">
						<input {...register(`habits.${index}.name`)} placeholder="e.g Drink Water" className={`input-field ${errors?.habits?.[index]?.name ? 'error' : ''}`} autoFocus={index === fields.length - 1} />

						{fields.length > 1 && <Button btnValue="-" btnOnClick={() => remove(index)} btnClass="remove-habit"></Button>}

						{errors?.habits?.[index]?.name && <span className="error-text">{errors.habits[index].name.message}</span>}
					</div>
				))}

				<Button btnType = 'button' btnValue="+ Add New Habit" btnOnClick={() => append({ name: '' })} btnClass="add-habit"></Button>

				<button type="submit" className="submit-btn">
					Save Habit
				</button>
			</form>
		</Modal>
	);
};

export default HabitModal;
