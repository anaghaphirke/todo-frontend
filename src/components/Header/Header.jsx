import { useContext, useEffect, useState } from 'react';
import './header.scss';
import { getTodayPageId, formatDate } from '../../utils/dateHelpers';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api/axios';

const Header = ({ toggleMobileMenu }) => {
	const date = formatDate(getTodayPageId(new Date()));
	const [quote, setQuote] = useState('This too shall pass');
	const { user } = useContext(AuthContext);

  useEffect(() => {
    api.get('/dailyquotes').then((res) => {
      setQuote(res.data[0].quote);
    })
  },[])

  const logOut = () => {
    console.log('logout')
		try {

			// Remove token
			localStorage.removeItem('token');
			localStorage.removeItem('user');

			// Redirect to login page
      window.location.href = `/`
		} catch (err) {
			alert(err.response?.data?.message || 'Logout failed');
		}
	 }

	return (
		<div className="journal-header">
			<div className="journal-header__wrapper">
				<div className="journal-header__user">
					<h1 className="journal-header__title"> {user.name}</h1>
					<h4 className="journal-header__info">{date}</h4>
					<h4 className="journal-header__info">{quote}</h4>
          <h4 className="journal-header__info" onClick={logOut}>Log out</h4>

				</div>
				<button className="journal-header__btn" onClick={toggleMobileMenu}>
					open
				</button>
			</div>
		</div>
	);
};

export default Header;
