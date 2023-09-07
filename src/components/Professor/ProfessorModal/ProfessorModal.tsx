import {
  TClassWithoutProfessor,
  TProfessor,
} from '../../../pages/Professor/ProfessorPage/ProfessorPage';
import api from '../../../services/api';

interface Props {
  show: boolean | ((isOpen: boolean) => void);
  toggle: (isOpen: boolean) => void;
  classesWithoutProfessor: TClassWithoutProfessor[];
  setNewProfessorData: React.Dispatch<React.SetStateAction<TProfessor>>;
  newProfessorData: TProfessor;
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

const ProfessorModal = ({
  show,
  toggle,
  classesWithoutProfessor,
  setNewProfessorData,
  newProfessorData,
}: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProfessorData({
      ...newProfessorData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    await api
      .post('/api/admin/professor/save', newProfessorData)
      .then((response) => {
        console.log(response);
        toggle(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div
      className={`${
        show ? 'flex' : 'hidden'
      } fixed w-full h-full items-center justify-center bg-black bg-opacity-40`}
    >
      <div className='w-1/2 bg-white rounded px-8 py-6 space-y-4'>
        <div className='flex items-center justify-between text-lg font-semibold pb-4 border-b-2 border-gray-100'>
          <div>
            <p>Kreiranje profesora</p>
          </div>
          <div>
            <button onClick={() => toggle(false)}>x</button>
          </div>
        </div>
        <form className='space-y-6' onSubmit={handleSubmitForm}>
          <div className='flex w-full space-x-4'>
            <div className='w-1/2 flex flex-col space-y-2 text-sm'>
              <label htmlFor='firstName' className='font-semibold'>
                Ime <span className='text-red-600'>*</span>
              </label>
              <input
                required
                id='firstName'
                name='firstName'
                type='text'
                placeholder='Ime...'
                onChange={handleChange}
                className='py-2 pr-4 pl-2 border-[1px] shadow outline-none rounded'
              />
            </div>
            <div className='w-1/2 flex flex-col space-y-2 text-sm'>
              <label htmlFor='firstName' className='font-semibold'>
                Prezime <span className='text-red-600'>*</span>
              </label>
              <input
                required
                id='lastName'
                name='lastName'
                type='text'
                placeholder='Prezime...'
                onChange={handleChange}
                className='py-2 pr-4 pl-2 border-[1px] shadow outline-none rounded'
              />
            </div>
          </div>
          <div className='flex flex-col space-y-2 text-sm'>
            <label htmlFor='email' className='font-semibold'>
              Email <span className='text-red-600'>*</span>
            </label>
            <input
              required
              id='email'
              name='email'
              type='email'
              placeholder='Email...'
              onChange={handleChange}
              className='py-2 pr-4 pl-2 border-[1px] shadow outline-none rounded'
            />
          </div>
          <div className='flex flex-col space-y-2 text-sm'>
            <label htmlFor='assignedClass' className='font-semibold'>
              Dodjeli razred
            </label>
            <select
              id='assignedClass'
              name='assignedClass'
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setNewProfessorData({
                  ...newProfessorData,
                  assignedClass: {
                    ...newProfessorData.assignedClass,
                    id: parseInt(e.target.value),
                  },
                })
              }
              className='py-2 pl-[2px] pr-4 border-[1px] shadow outline-none rounded'
            >
              <option value='default'>Odaberi razred</option>
              {classesWithoutProfessor.map((classWithoutProfessor) => (
                <option
                  key={classWithoutProfessor.id}
                  value={classWithoutProfessor.id}
                >
                  {`${numberConvert[classWithoutProfessor.year]}-${
                    classWithoutProfessor.major.department
                  } `}
                  {`${classWithoutProfessor.major.name}`}
                </option>
              ))}
            </select>
          </div>
          <div className='w-full flex justify-end space-x-2 py-2'>
            <div
              onClick={() => toggle(false)}
              className='px-4 py-2 cursor-pointer rounded border-[1px] border-red-600 text-sm text-red-600 font-semibold'
            >
              Otkaži
            </div>
            <button className='px-4 py-2 rounded bg-blue-600 text-white text-sm border-[1px] border-blue-600 font-semibold'>
              Spremi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfessorModal;
