import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WelcomScreen from '../pages/Welcome/WelcomScreen';
import Main from '../pages/Main/Main';
import Days from '../pages/Days/Days';
import RedirectToToday from '../components/Redirect/RedirectToToday';
import Moods from '../pages/Moods/Moods';
import Habits from '../pages/Habits/Habits';
import Register from '../pages/Register/Register'
import Error from '../pages/Error/Error';
import ProtectedRoute from './ProtectedRoutes';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Welcome Page */}
      <Route path="/" element={<WelcomScreen />} />
      <Route path="/journal-register" element={<Register />} />

      <Route path="/" element={<ProtectedRoute><Main /></ProtectedRoute>}>
        <Route path="/journal-page">
          <Route index element={<RedirectToToday />} />
          <Route path=":pageId" element={<ProtectedRoute><Days /></ProtectedRoute>} />
        </Route>

        <Route path="/journal-moods" element={<Moods />}></Route>

        <Route path="/journal-habits" element={<Habits />}></Route>

      </Route>

      <Route
        path="*"
        element={<Error message="Page not found. Please login again." />}
      />
    </Routes>
  );
};

export default AppRoutes;
