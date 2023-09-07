import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../helper/ReduxHooks/Hooks';
import { TClassDetails } from '../../../pages/Classes/ClassPage/ClassPage';

interface Props {
  classes: TClassDetails[];
  checkedItems: number[];
  setCheckedItems: React.Dispatch<React.SetStateAction<number[]>>;
}

interface KeyNumberParam {
  [key: number]: string;
}

const numberConvert: KeyNumberParam = {
  1: 'I',
  2: 'II',
  3: 'III',
  4: 'IV',
};

const ClassTable = ({ classes, checkedItems, setCheckedItems }: Props) => {
  const isLoaded = useAppSelector((state) => state.loading.isLoaded);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    if (e.target.checked) {
      setCheckedItems([...checkedItems, id]);
    } else {
      setCheckedItems(checkedItems.filter((item) => item !== id));
    }
  };

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
                <th scope='col' className='px-6 py-3'>
                  <span className='sr-only'>Pogledaj</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {classes.map((classItem: TClassDetails) => (
                <tr
                  className={`${
                    checkedItems.includes(classItem.id)
                      ? 'bg-slate-200'
                      : 'bg-white hover:bg-slate-100'
                  } border-b`}
                  key={classItem.id}
                >
                  <td className='w-4 p-4'>
                    <div className='flex items-center justify-center'>
                      <input
                        id='checkbox-table-search'
                        type='checkbox'
                        onChange={(e) => handleChange(e, classItem.id)}
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
                    {`${numberConvert[classItem.year]}-${
                      classItem.major?.department
                    }`}
                  </th>
                  <td className='px-4 py-4 font-medium text-gray-900 whitespace-nowrap '>
                    {classItem.major?.name}
                  </td>
                  <td
                    className={`px-6 py-4 font-medium ${
                      classItem.professor === null
                        ? 'text-gray-400'
                        : 'text-gray-900'
                    } whitespace-nowrap`}
                  >
                    {classItem.professor === null
                      ? 'Nije dodjeljen'
                      : `${classItem.professor?.firstName} ${classItem.professor?.lastName}`}
                  </td>
                  <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap '>
                    {classItem.students?.length}
                  </td>
                  <td className='px-4 py-4 font-medium text-gray-900 whitespace-nowrap '>
                    <Link
                      to={`/razredi/${classItem.id}`}
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

export default ClassTable;
