import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login/Login';
import { useEffect } from 'react';
import Dashboard from './pages/Dashboard/Dashboard';
import NotFound from './pages/NotFound/NotFound';
import { useAppDispatch, useAppSelector } from './helper/Hooks';
import { setIsAuthenticated } from './redux/slices/authenticationSlice';
import Class from './pages/Classes/Class/Class';
import ClassDetails from './pages/Classes/ClassDetails/ClassDetails';
import Sidebar from './components/Sidebar';

function App() {
  const location = useLocation();
  const isAuthenticated = useAppSelector(
    (state) => state.authentication.isAuthenticated
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    localStorage.setItem('url', location.pathname);
    if (localStorage.getItem('accessToken')) {
      dispatch(setIsAuthenticated(true));
    }
  }, [dispatch, location.pathname]);

  return (
    <>
      <div className='flex'>
        {isAuthenticated && <Sidebar />}
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
              isAuthenticated ? <NotFound /> : <Navigate to='/login' replace />
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
      </div>
    </>
  );
}

export default App;
