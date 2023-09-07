import ProfessorTable from '../../../components/Professor/ProfessorTable/ProfessorTable';
import Sidebar from '../../../components/Sidebar/Sidebar';
import { useAppSelector } from '../../../helper/ReduxHooks/Hooks';
import { useEffect, useState } from 'react';
import useToggle from '../../../helper/useToggle';
import api from '../../../services/api';
import ProfessorModal from '../../../components/Professor/ProfessorModal/ProfessorModal';

export type TClassWithoutProfessor = {
  id: number;
  major: {
    department: number;
    name: string;
  };
  year: number;
};

export type TProfessor = {
  firstName: string;
  lastName: string;
  email: string;
  assignedClass: {
    id: number | null;
  };
};

const Professor = () => {
  const isLoaded = useAppSelector((state) => state.loading.isLoaded);
  const [isOpen, toggle] = useToggle(false);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [classesWithoutProfessor, setClassesWithoutProfessor] = useState<
    TClassWithoutProfessor[]
  >([]);
  const [newProfessorData, setNewProfessorData] = useState<TProfessor>({
    firstName: '',
    lastName: '',
    email: '',
    assignedClass: {
      id: null,
    },
  });

  const getClassesWithoutProfessor = async () => {
    api
      .get('/api/admin/class/get/classes-wtihout-professor')
      .then((response) => {
        console.log(response.data);
        setClassesWithoutProfessor(response.data);
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteProfessor = async () => {
    await api
      .delete('/api/admin/professor/delete', { data: checkedItems })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getClassesWithoutProfessor();
  }, []);

  return (
    <div className='flex w-full'>
      <Sidebar />
      <div className=' w-5/6'>
        <div className='flex bg-white items-center text-lg font-semibold pl-6 w-full h-16 border-b-[1px]'>
          Pregled profesora
        </div>
        <div className='w-full flex justify-between items-center px-6 pt-6'>
          <div className='w-1/4'>
            <input
              type='text'
              placeholder='Pretraži...'
              disabled={!isLoaded}
              //value={searchString}
              //onChange={handleSearch}
              className='w-full border-[1px] border-gray-400 rounded-md py-1 px-2 outline-slate-200 outline-1'
            />
          </div>
          <div className='flex space-x-2'>
            {checkedItems.length > 0 && (
              <div
                onClick={handleDeleteProfessor}
                className='flex items-center px-4 py-1 text-sm border-2 border-red-600 text-red-600 rounded-md cursor-pointer'
              >
                Obriši
              </div>
            )}
            <div
              onClick={() => toggle(!isOpen)}
              className='flex items-center px-4 py-2 text-sm text-white bg-blue-600 rounded-md cursor-pointer'
            >
              + Dodaj Professora
            </div>
          </div>
        </div>
        <div className='px-6 pt-6'>
          <ProfessorTable
            setCheckedItems={setCheckedItems}
            checkedItems={checkedItems}
          />
        </div>
      </div>
      <ProfessorModal
        show={isOpen}
        toggle={toggle}
        classesWithoutProfessor={classesWithoutProfessor}
        setNewProfessorData={setNewProfessorData}
        newProfessorData={newProfessorData}
      />
    </div>
  );
};

export default Professor;
