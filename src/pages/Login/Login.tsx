import { useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../helper/ReduxHooks/Hooks';
import { setIsAuthenticated } from '../../redux/slices/authenticationSlice';

type TUser = {
  username: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [error, setError] = useState(false);
  const [userCredentials, setUserCredentials] = useState<TUser>({
    username: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api
      .post('/api/auth/login', {
        username: userCredentials.username,
        password: userCredentials.password,
      })
      .then((response) => {
        localStorage.setItem('accessToken', response.data.accessToken);
        dispatch(setIsAuthenticated(true));
        setUserCredentials({ username: '', password: '' });
        navigate('/');
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setError(true);
        }
      });
  };

  return (
    <>
      <div className='w-full h-screen bg-slate-100 flex items-center justify-center'>
        <div className='h-full bg w-1/4 flex flex-col items-center justify-center'>
          <div className='w-full rounded-lg px-10 py-6 shadow-lg border-[1px] border-slate-200 bg-slate-50 drop-shadow-lg'>
            <p className='text-center text-2xl pb-8'>
              <span className='text-blue-600'>e</span>-Dnevnik
            </p>
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='flex flex-col w-full space-y-2'>
                <label htmlFor='username'>
                  Username <span className='text-red-600'>*</span>
                </label>
                <input
                  className={`h-10 max-w-4xl rounded-lg px-2 border-[1px] ${
                    error ? 'border-red-600' : 'border-gray-400'
                  }`}
                  required
                  placeholder='example@mail.com'
                  type='text'
                  id='username'
                  name='username'
                  value={userCredentials.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className='flex flex-col w-full space-y-2 pb-2'>
                <label htmlFor='password'>
                  Password <span className='text-red-600'>*</span>
                </label>
                <input
                  className={`h-10 max-w-4xl rounded-lg px-2 border-[1px] ${
                    error ? 'border-red-600' : 'border-gray-400'
                  }`}
                  required
                  placeholder='*******'
                  type='password'
                  id='password'
                  name='password'
                  value={userCredentials.password}
                  onChange={handleInputChange}
                />
                <div className={error ? 'block' : 'hidden'}>
                  <p className='text-red-600'>Username ili šifra nije tačna</p>
                </div>
              </div>
              <button className='w-full bg-blue-600 rounded-lg py-2 text-white '>
                Prijava
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
