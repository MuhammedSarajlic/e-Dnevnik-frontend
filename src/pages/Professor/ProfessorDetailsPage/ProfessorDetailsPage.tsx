import { useParams } from 'react-router-dom';
import Sidebar from '../../../components/Sidebar/Sidebar';
import api from '../../../services/api';
import { useCallback, useEffect, useState } from 'react';

type TProfessor = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  assignedClass?: {
    id: number;
    major: {
      id: number;
      name: string;
      department: number;
    };
    students: [];
    year: number;
  };
  subjects?: [];
};

const ProfessorDetailsPage = () => {
  const params = useParams();
  const [currentProfessor, setCurrentProfessor] = useState<TProfessor | null>(
    null
  );

  const getCurrentProfessor = useCallback(async () => {
    await api
      .get(`/api/admin/professor/get/${params.id}`)
      .then((response) => setCurrentProfessor(response.data.data))
      .catch((error) => console.log(error));
  }, [params.id]);

  useEffect(() => {
    getCurrentProfessor();
  }, [getCurrentProfessor]);
  return (
    <>
      {console.log(currentProfessor)}
      <div className='flex w-full'>
        <Sidebar />
        <div className=' w-5/6'>
          <div className='flex bg-white items-center text-lg font-semibold pl-6 w-full h-16 border-b-[1px]'>
            {`${currentProfessor?.firstName} ${currentProfessor?.lastName}`}
          </div>
          <div className='w-full flex justify-between px-6 pt-8 space-x-8'>
            <div className='w-1/3 border-[1px] rounded flex space-x-2 shadow'>
              <div className='h-full w-2 bg-blue-600 rounded-tl rounded-bl'></div>
              <div className='py-2 space-y-2'>
                <div className='text-lg font-semibold'>Razred</div>
                <div className='text-sm'>
                  {currentProfessor?.assignedClass == null
                    ? 'Nije dodjeljen'
                    : `${currentProfessor?.assignedClass.year}-${currentProfessor?.assignedClass.major.department}`}
                </div>
              </div>
            </div>
            <div className='w-1/3 border-[1px] rounded flex space-x-2 shadow'>
              <div className='h-full w-2 bg-blue-600 rounded-tl rounded-bl'></div>
              <div className='py-2 space-y-2'>
                <div className='text-lg font-semibold'>Broj predmeta</div>
                <div className='text-sm'>
                  {currentProfessor?.subjects?.length}
                </div>
              </div>
            </div>
            <div className='w-1/3 border-[1px] rounded flex space-x-2 shadow'>
              <div className='h-full w-2 bg-blue-600 rounded-tl rounded-bl'></div>
              <div className='py-2 space-y-2'>
                <div className='text-lg font-semibold'>Email</div>
                <div className='text-sm'>{currentProfessor?.email}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfessorDetailsPage;
