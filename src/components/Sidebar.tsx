import { BiSolidDashboard } from 'react-icons/bi';
import { SiGoogleclassroom } from 'react-icons/si';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { PiStudentFill } from 'react-icons/pi';
import { BiLogOut } from 'react-icons/bi';
import { BsFillJournalBookmarkFill } from 'react-icons/bs';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../helper/Hooks';
import { setIsAuthenticated } from '../redux/slices/authenticationSlice';

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const handleLogOut = () => {
    localStorage.removeItem('accessToken');
    dispatch(setIsAuthenticated(false));
    navigate('/');
  };

  return (
    <div className='w-1/6 h-screen border-r-[1px] flex flex-col justify-between'>
      <div>
        <p className='text-center text-2xl py-4'>
          <span className='text-blue-600'>e</span>-Dnevnik
        </p>
        <div className='flex flex-col items-center pt-10'>
          <ul className='space-y-4 '>
            <Link
              to='/'
              className={`flex items-center space-x-4 cursor-pointer px-4 py-2 rounded-lg ${
                location.pathname === '/' && 'bg-blue-100 text-blue-600'
              } `}
            >
              <BiSolidDashboard size='1.1em' />
              <p>Upravljačka tabla</p>
            </Link>
            <Link
              to='/razredi'
              className={`flex items-center space-x-4 cursor-pointer px-4 py-2 rounded-lg ${
                location.pathname.includes('/razredi') &&
                'bg-blue-100 text-blue-600'
              }`}
            >
              <SiGoogleclassroom size='1.1em' />
              <p>Razredi</p>
            </Link>
            <Link
              to='/profesori'
              className={`flex items-center space-x-4 cursor-pointer px-4 py-2 rounded-lg ${
                location.pathname === '/profesori' &&
                'bg-blue-100 text-blue-600'
              }`}
            >
              <FaChalkboardTeacher size='1.1em' />
              <p>Profesori</p>
            </Link>
            <Link
              to='/ucenici'
              className={`flex items-center space-x-4 cursor-pointer px-4 py-2 rounded-lg ${
                location.pathname === '/ucenici' && 'bg-blue-100 text-blue-600'
              }`}
            >
              <PiStudentFill size='1.1em' />
              <p>Učenici</p>
            </Link>
            <Link
              to='/odjeljenja'
              className={`flex items-center space-x-4 cursor-pointer px-4 py-2 rounded-lg ${
                location.pathname === '/odjeljenja' &&
                'bg-blue-100 text-blue-600'
              }`}
            >
              <BsFillJournalBookmarkFill size='1.1em' />
              <p>Odjeljena</p>
            </Link>
          </ul>
        </div>
      </div>
      <div className='flex pb-8 pl-8'>
        <div
          onClick={handleLogOut}
          className='py-2 pr-4 cursor-pointer flex items-center space-x-4'
        >
          <BiLogOut size='1.1em' />
          <p className='m-0'>Odjava</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
