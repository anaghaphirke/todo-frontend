import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useState, useContext } from 'react';
import api from '../../api/axios';
import { moodToValue, valueToEmoji, valueToMood } from '../../utils/moodMaps';
import { formatDate } from '../../utils/dateHelpers';
import { AuthContext } from '../../context/AuthContext';
import './moodLineChart.scss';

const Moods = () => {
	const [moodEntries, setMoodEntries] = useState([]);
	const { user } = useContext(AuthContext);
	const userID = user.id;

	useEffect(() => {
		const fetchMoods = async () => {
			const res = await api.get(`/moods/${userID}`);

			setMoodEntries(res.data);
		};

		fetchMoods();
	}, [userID]);

	const data = moodEntries.map((entry) => ({
		date: formatDate(entry.date), // dd-mm-yyyy
		moodValue: moodToValue[entry.mood]
	}));

	return (
		<div className="mood-line-card">
			<h2>🌙 Mood Journey</h2>

			<ResponsiveContainer width="100%" height="100%">
				<LineChart data={data} margin={{ top: 30, right: 30, left: 10, bottom: 50 }}>
					<XAxis dataKey="date" />
					<YAxis ticks={[1, 2, 3, 4, 5]} tickFormatter={(value) => valueToEmoji[value]} />
					<Tooltip formatter={(value) => `${valueToMood[value]} ${valueToEmoji[value]}`} labelFormatter={(label) => `📅 ${label}`} />
					<Line type="monotone" dataKey="moodValue" stroke="#b780ff" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};

export default Moods;
