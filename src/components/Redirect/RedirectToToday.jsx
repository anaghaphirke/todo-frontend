// pages/RedirectToToday.jsx
import { Navigate } from 'react-router-dom';
import { getTodayPageId } from '../../utils/dateHelpers';

const RedirectToToday = () => {
	const today = new Date();
	return <Navigate to={`/journal-page/${getTodayPageId(today)}`} replace />;
};

export default RedirectToToday;
