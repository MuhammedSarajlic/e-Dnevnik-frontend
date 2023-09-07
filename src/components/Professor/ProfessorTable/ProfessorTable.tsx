import { useCallback, useMemo, useState } from 'react';
import api from '../../../services/api';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../helper/ReduxHooks/Hooks';
import { setIsLoaded } from '../../../redux/slices/LoadingSlice';

type TProfessor = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  subjects: [];
};

interface Props {
  checkedItems: number[];
  setCheckedItems: React.Dispatch<React.SetStateAction<number[]>>;
}

const ProfessorTable = ({ setCheckedItems, checkedItems }: Props) => {
  const [professorList, setProfessorList] = useState<TProfessor[]>([]);
  const isLoaded = useAppSelector((state) => state.loading.isLoaded);
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    if (e.target.checked) {
      setCheckedItems([...checkedItems, id]);
    } else {
      setCheckedItems(checkedItems.filter((item) => item !== id));
    }
  };

  const getListOfProfessors = useCallback(() => {
    api
      .get('/api/admin/professor/get')
      .then((response) => {
        setProfessorList(response.data);
        dispatch(setIsLoaded(true));
      })
      .catch((error) => console.log(error));
  }, [dispatch, setProfessorList]);

  useEffect(() => {
    dispatch(setIsLoaded(false));
    getListOfProfessors();
  }, [dispatch, getListOfProfessors]);

  return (
    <>
      {isLoaded ? (
        <div className='relative overflow-x-auto sm:rounded-lg text-gray-500 border-[1px] shadow-lg'>
          <table className='w-full text-sm text-left'>
            <thead className='text-gray-400 bg-white border-b-[1px]'>
              <tr>
                <th scope='col' className='p-4'>
                  Odaberi
                </th>
                <th scope='col' className='px-6 py-3'>
                  Ime
                </th>
                <th scope='col' className='px-4 py-3'>
                  Prezime
                </th>
                <th scope='col' className='px-6 py-3'>
                  Email
                </th>
                <th scope='col' className='px-6 py-3'>
                  Broj predmeta
                </th>
                <th scope='col' className='px-6 py-3'>
                  <span className='sr-only'>Pogledaj</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {professorList.map((professor: TProfessor) => (
                <tr
                  className={`${
                    checkedItems.includes(professor.id)
                      ? 'bg-slate-200'
                      : 'bg-white hover:bg-slate-100'
                  } border-b`}
                  key={professor.id}
                >
                  <td className='w-4 p-4'>
                    <div className='flex items-center justify-center'>
                      <input
                        id='checkbox-table-search'
                        type='checkbox'
                        onChange={(e) => handleChange(e, professor.id)}
                        className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded'
                      />
                      <label
                        htmlFor='checkbox-table-search'
                        className='sr-only'
                      >
                        checkbox
                      </label>
                    </div>
                  </td>
                  <th
                    scope='row'
                    className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'
                  >
                    {professor.firstName}
                  </th>
                  <td className='px-4 py-4 font-medium text-gray-900 whitespace-nowrap '>
                    {professor.lastName}
                  </td>
                  <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                    {professor.email}
                  </td>
                  <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap '>
                    {professor.subjects?.length}
                  </td>
                  <td className='px-4 py-4 font-medium text-gray-900 whitespace-nowrap '>
                    <Link
                      to={`/profesor/${professor.id}`}
                      className='p-2 font-medium text-blue-600 hover:text-blue-500'
                    >
                      Pogledaj
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className='relative overflow-x-auto sm:rounded-lg text-gray-500 border-[1px] shadow-lg'>
          <table className='w-full text-sm text-left'>
            <thead className='text-gray-400 bg-white border-b-[1px]'>
              <tr>
                <th scope='col' className='p-4'>
                  Odaberi
                </th>
                <th scope='col' className='px-6 py-3'>
                  Razred
                </th>
                <th scope='col' className='px-4 py-3'>
                  Odjeljenje
                </th>
                <th scope='col' className='px-6 py-3'>
                  Profesor
                </th>
                <th scope='col' className='px-6 py-3'>
                  Broj učenika
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className='animate-loading border-b'>
                <td className='px-6 py-6 font-medium text-gray-900 whitespace-nowrap'></td>
                <td className='px-4 py-4 font-medium text-gray-900 whitespace-nowrap '></td>
                <td></td>
                <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap '></td>
                <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap '></td>
              </tr>
              <tr className='animate-loading border-b'>
                <td className='px-6 py-6 font-medium text-gray-900 whitespace-nowrap'></td>
                <td className='px-4 py-4 font-medium text-gray-900 whitespace-nowrap '></td>
                <td></td>
                <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap '></td>
                <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap '></td>
              </tr>
              <tr className='animate-loading border-b'>
                <td className='px-6 py-6 font-medium text-gray-900 whitespace-nowrap'></td>
                <td className='px-4 py-4 font-medium text-gray-900 whitespace-nowrap '></td>
                <td></td>
                <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap '></td>
                <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap '></td>
              </tr>
              <tr className='animate-loading border-b'>
                <td className='px-6 py-6 font-medium text-gray-900 whitespace-nowrap'></td>
                <td className='px-4 py-4 font-medium text-gray-900 whitespace-nowrap '></td>
                <td></td>
                <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap '></td>
                <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap '></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default ProfessorTable;
