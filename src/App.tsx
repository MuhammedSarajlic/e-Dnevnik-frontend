import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login/Login';
import { useEffect } from 'react';
import Dashboard from './pages/Dashboard/Dashboard';
import NotFound from './pages/NotFound/NotFound';
import { useAppDispatch, useAppSelector } from './helper/Hooks';
import { setIsAuthenticated } from './redux/slices/authenticationSlice';
import Class from './pages/Classes/Class/Class';
import ClassDetails from './pages/Classes/ClassDetails/ClassDetails';

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

  const routes = [
    // {
    //   path: '/login',
    //   element: <Login />,
    //   isAuthReq: false,
    // },
    // {
    //   path: '/',
    //   element: <Dashboard />,
    //   isAuthReq: true,
    // },
    {
      path: '/razredi',
      element: <Class />,
      isAuthReq: true,
    },
    {
      path: '/razredi/:id',
      element: <ClassDetails />,
      isAuthReq: true,
    },
    {
      path: '/profesori',
      element: <NotFound />,
      isAuthReq: true,
    },
    {
      path: '/ucenici',
      element: <NotFound />,
      isAuthReq: true,
    },
    {
      path: '/odjeljenja',
      element: <NotFound />,
      isAuthReq: true,
    },
  ];

  return (
    <>
      <Routes>
        <Route
          path='/'
          element={!isAuthenticated ? <Login /> : <Dashboard />}
        />
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              isAuthenticated ? route.element : <Navigate to='/' replace />
            }
          />
        ))}
        {/* <Route
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
          <Route path='/*' element={<NotFound />} /> */}
      </Routes>
    </>
  );
}

export default App;
