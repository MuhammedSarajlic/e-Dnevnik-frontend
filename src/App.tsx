import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login/Login';
import { useEffect } from 'react';
import Dashboard from './pages/Dashboard/Dashboard';
import NotFound from './pages/NotFound/NotFound';
import { useAppDispatch, useAppSelector } from './helper/ReduxHooks/Hooks';
import { setIsAuthenticated } from './redux/slices/authenticationSlice';
import Class from './pages/Classes/ClassPage/ClassPage';
import ClassDetails from './pages/Classes/ClassDetailsPage/ClassDetailsPage';
import Professor from './pages/Professor/ProfessorPage/ProfessorPage';
import ProfessorDetailsPage from './pages/Professor/ProfessorDetailsPage/ProfessorDetailsPage';

function App() {
  const location = useLocation();
  const isAuthenticated = useAppSelector(
    (state) => state.authentication.isAuthenticated
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (location.pathname !== '/login') {
      localStorage.setItem('url', location.pathname);
    }
    if (localStorage.getItem('accessToken')) {
      dispatch(setIsAuthenticated(true));
    }
  }, [dispatch, location.pathname]);

  return (
    <>
      <Routes>
        <Route
          path='/login'
          element={
            !isAuthenticated ? (
              <Login />
            ) : (
              <Navigate to={`${localStorage.getItem('url')}`} replace />
            )
          }
        />
        <Route
          path='/'
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to='/login' replace />
          }
        />
        <Route
          path='/razredi'
          element={
            isAuthenticated ? <Class /> : <Navigate to='/login' replace />
          }
        />
        <Route
          path='/razredi/:id'
          element={
            isAuthenticated ? (
              <ClassDetails />
            ) : (
              <Navigate to='/login' replace />
            )
          }
        />
        <Route
          path='/profesori'
          element={
            isAuthenticated ? <Professor /> : <Navigate to='/login' replace />
          }
        />
        <Route
          path='/profesor/:id'
          element={
            isAuthenticated ? (
              <ProfessorDetailsPage />
            ) : (
              <Navigate to='/login' replace />
            )
          }
        />
        <Route
          path='/ucenici'
          element={
            isAuthenticated ? <NotFound /> : <Navigate to='/login' replace />
          }
        />
        <Route
          path='/odjeljenja'
          element={
            isAuthenticated ? <NotFound /> : <Navigate to='/login' replace />
          }
        />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
