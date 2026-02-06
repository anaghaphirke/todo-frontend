import { Link } from 'react-router-dom';
import { getTodayPageId } from '../../utils/dateHelpers';
import './paginations.scss';

const Pagination = ({ curentPageId }) => {
	const currentDate = new Date(curentPageId.substring(0, 4), curentPageId.substring(4, 6) - 1, curentPageId.substring(6, 8));

	const today = new Date();

	const prevDate = new Date(currentDate);
	prevDate.setDate(currentDate.getDate() - 1);

	const nextDate = new Date(currentDate);
	nextDate.setDate(currentDate.getDate() + 1);

	return (
		<div className="journal-pagination">
			<Link to={`/journal-page/${getTodayPageId(prevDate)}`} className="page-btn">
				← Prev
			</Link>

			<Link to={`/journal-page/${getTodayPageId(today)}`} className="page-btn today">
				Today ✨
			</Link>

			<Link to={`/journal-page/${getTodayPageId(nextDate)}`} className="page-btn">
				Next →
			</Link>
		</div>
	);
};

export default Pagination;
