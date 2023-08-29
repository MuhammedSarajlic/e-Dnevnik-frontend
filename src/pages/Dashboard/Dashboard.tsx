import Sidebar from '../../components/Sidebar';

const Dashboard = () => {
  return (
    <div className='flex w-full'>
      <Sidebar />
      <div className='w-5/6'></div>
    </div>
  );
};

export default Dashboard;
