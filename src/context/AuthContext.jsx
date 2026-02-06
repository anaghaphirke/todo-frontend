import { createContext, useState } from 'react';
import api from '../api/axios';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
 
	const login = (userData, token) => {
		localStorage.setItem('user', JSON.stringify(userData));
		localStorage.setItem('token', token);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

		setUser(userData);
	};

	const logout = () => {
		localStorage.removeItem('user');
		localStorage.removeItem('token');
        delete api.defaults.headers.common["Authorization"];

		setUser(null);
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				login,
				logout
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
