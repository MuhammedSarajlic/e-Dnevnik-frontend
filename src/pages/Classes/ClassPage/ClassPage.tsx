import { useState, useEffect } from 'react';
import api from '../../../services/api';
import ClassTable from '../../../components/Class/ClassTable/ClassTable';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../helper/ReduxHooks/Hooks';
import { setIsLoaded } from '../../../redux/slices/LoadingSlice';
import NewClassModal from '../../../components/Class/ClassModal/ClassModal';
import useToggle from '../../../helper/useToggle';
import Sidebar from '../../../components/Sidebar/Sidebar';

export type TClassDetails = {
  id: number;
  major: {
    department: number;
    id: number;
    name: string;
    subjects: [];
  };
  professor: {
    firstName: string;
    id: number;
    lastName: string;
  };
  students: [
    {
      id: number;
      firstName: string;
      lastName: string;
    }
  ];
  year: number;
};

export interface MajorDetails {
  id: number;
  name: string;
  department: number;
}

export interface ProfessorDetails {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface StudentDetails {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface KeyStringParam {
  [key: string]: string;
}

const letterConvert: KeyStringParam = {
  č: 'c',
  ć: 'c',
  đ: 'd',
  š: 's',
  ž: 'ž',
};

const Class = () => {
  const [classes, setClasses] = useState<TClassDetails[]>([]);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [searchString, setSearchString] = useState('');
  const [searchResult, setSearchResult] = useState<TClassDetails[]>([]);
  const [allMajors, setAllMajors] = useState<MajorDetails[]>([]);
  const [allProfessors, setAllProfessors] = useState<ProfessorDetails[]>([]);
  const [allStudents, setAllStudents] = useState<StudentDetails[]>([]);
  const isLoaded = useAppSelector((state) => state.loading.isLoaded);
  const dispatch = useAppDispatch();
  const [isOpen, toggle] = useToggle(false);

  const fetchMajors = async () => {
    await api
      .get('/api/admin/major/get')
      .then((response) => {
        const majorResponse = response.data.sort(
          (a: MajorDetails, b: MajorDetails) => a.department - b.department
        );
        setAllMajors(majorResponse);
      })
      .catch((error) => console.log(error));
  };

  const fetchProfessors = async () => {
    await api
      .get('/api/admin/professor/get')
      .then((response) => setAllProfessors(response.data))
      .catch((error) => console.log(error));
  };

  const fetchStudents = async () => {
    await api
      .get('/api/admin/student/get/students-wtihout-class')
      .then((response) => setAllStudents(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    dispatch(setIsLoaded(false));
    const getAllClasses = async () => {
      await api
        .get('/api/admin/class/get')
        .then((response) => {
          setClasses(response.data);
          dispatch(setIsLoaded(true));
        })
        .catch((error) => console.log(error));
    };
    getAllClasses();
    fetchMajors();
    fetchProfessors();
    fetchStudents();
  }, [dispatch]);

  // Search function
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
    const searchValue = e.target.value
      .toLowerCase()
      .replace(/./g, (l) => letterConvert[l] || l);
    const filteredClasses = classes.filter((classItem) =>
      classItem.major.name
        .toLowerCase()
        .replace(/./g, (l) => letterConvert[l] || l)
        .includes(searchValue)
    );
    setSearchResult(filteredClasses);
  };

  return (
    <div className='flex w-full'>
      <Sidebar />
      <div className=' w-5/6'>
        <div className='flex bg-white items-center text-lg font-semibold pl-6 w-full h-16 border-b-[1px]'>
          Pregled razreda
        </div>
        <div className='w-full flex justify-between items-center px-6 pt-6'>
          <div className='w-1/4'>
            <input
              type='text'
              placeholder='Pretraži...'
              disabled={!isLoaded}
              value={searchString}
              onChange={handleSearch}
              className='w-full border-[1px] border-gray-400 rounded-md py-1 px-2 outline-slate-200 outline-1'
            />
          </div>
          <div className='flex space-x-2'>
            {checkedItems.length > 0 && (
              <div className='flex items-center px-4 py-1 text-sm border-2 border-red-600 text-red-600 rounded-md cursor-pointer'>
                Obriši
              </div>
            )}
            <div
              onClick={() => toggle(!isOpen)}
              className='flex items-center px-4 py-2 text-sm text-white bg-blue-600 rounded-md cursor-pointer'
            >
              + Dodaj razred
            </div>
          </div>
        </div>
        <div className='px-6 pt-6'>
          <ClassTable
            classes={searchString === '' ? classes : searchResult}
            checkedItems={checkedItems}
            setCheckedItems={setCheckedItems}
          />
        </div>
      </div>
      <NewClassModal
        show={isOpen}
        toggle={toggle}
        allMajors={allMajors}
        allProfessors={allProfessors}
        allStudents={allStudents}
      />
    </div>
  );
};

export default Class;
