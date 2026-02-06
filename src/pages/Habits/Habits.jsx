import React, { useEffect, useState } from 'react';
import './habits.scss';
// import { AuthContext } from '../../context/AuthContext';
import api from '../../api/axios';
import Button from '../../components/Button/Button';
import HabitModal from '../../components/Modals/HabitModal';

const Habits = () => {
	const [habits, setHabits] = useState([]);
	const [habitLog, setHabitLog] = useState({});
	const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
	const [isModalOpen, setIsModalOpen] = useState(false);

	// const { user } = useContext(AuthContext);


	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	const daysInMonth = new Date(2026, selectedMonth + 1, 0).getDate();

	useEffect(() => {
	fetchHabits();
	},[selectedMonth]);

  const fetchHabits = async () => {
    try{
api
			.get(`/habits/2026-${String(selectedMonth + 1).padStart(2, '0')}`)
			.then((res) => {
				setHabits(Array.from(new Map(res.data.map((item) => [item.name, item])).values()));
				const mapped = {};
				res.data.forEach((log) => {
					const day = new Date(log.log_date).getDate();
					mapped[`${selectedMonth}-${log.habit_id}-${day}`] = log.done;
				});
				setHabitLog(mapped);
			})
			.catch(console.error);
    }
    catch(err){
      console.log('err')
    }
  }

	const toggleHabit = async (habitId, day) => {
		const key = `${selectedMonth}-${habitId}-${day}`;
		const newValue = !habitLog[key];

		setHabitLog((prev) => ({ ...prev, [key]: newValue }));

		await api.post(`/habits/logs`, {
			habit_id: habitId,
			date: `2026-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
			done: newValue
		});
	};

	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
	};

	return (
		<div className="habits-page">
			<div className="habits__header">
				<select value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))}>
					{months.map((month, index) => (
						<option value={index} key={month}>
							{month}
						</option>
					))}
				</select>

				<Button
					btnClass="habits__add-btn"
					btnValue="Add Habit"
					btnOnClick={() => {
						console.log('btn clicked');
						setIsModalOpen(true);
					}}
				></Button>
			</div>
			{isModalOpen ? <HabitModal isModalOpen={isModalOpen} onClose={toggleModal} fetchHabits={fetchHabits}></HabitModal> : ''}

			<div className="habits__table-wrapper habits__tbody--desktop">
				<table className="habits__table">
					<thead>
						<tr>
							<th className="habits__col">Habit</th>
							{Array.from({ length: daysInMonth }, (_, i) => (
								<th key={i}>{i + 1}</th>
							))}
						</tr>
					</thead>

					<tbody>
						{habits.map((habit) => (
							<tr key={habit.id}>
								<td className="habits__col">
									<span>{habit.emoji}</span>
									{habit.name}
								</td>

								{Array.from({ length: daysInMonth }, (_, i) => {
									const day = i + 1;
									const key = `${selectedMonth}-${habit.habit_id}-${day}`;
									const done = habitLog[key];

									return (
										<td key={day} className={`habits__cell ${done ? 'done' : ''}`} onClick={() => toggleHabit(habit.habit_id, day)}>
											{done ? done && '✓' : ''}
										</td>
									);
								})}
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className="habits__table-wrapper habits__tbody--mobile">
				<table className="habits__table">
					<thead>
						<tr>
							<th className="habits__col">Habit</th>

							{habits.map((habit) => (
								<th key={habit.id} className="habits__col">
									<span>{habit.emoji}</span>
									{habit.name}
								</th>
							))}
						</tr>
					</thead>

					<tbody>
						{Array.from({ length: daysInMonth }, (_, i) => (
							<tr key={i}>
								<td className="habits__col">
									<span>{i + 1}</span>
								</td>

								{habits.map((habit) => {
									const day = i + 1;
									const key = `${selectedMonth}-${habit.habit_id}-${day}`;
									const done = habitLog[key];
									return (
										<td key={key} className={`habits__cell ${done ? 'done' : ''}`} onClick={() => toggleHabit(habit.habit_id, day)}>
											{done ? done && '✓' : ''}
										</td>
									);
								})}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Habits;
