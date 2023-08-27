import { useState } from 'react';
import {
  MajorDetails,
  ProfessorDetails,
  StudentDetails,
} from '../pages/Classes/Class/Class';

interface Props {
  show: boolean | ((isOpen: boolean) => void);
  toggle: (isOpen: boolean) => void;
  allMajors: MajorDetails[];
  allProfessors: ProfessorDetails[];
  allStudents: StudentDetails[];
}

const NewClassModal = ({
  show,
  toggle,
  allMajors,
  allProfessors,
  allStudents,
}: Props) => {
  const [schoolType, setSchoolType] = useState('');
  return (
    <div
      className={`${
        show ? 'flex' : 'hidden'
      } fixed w-full h-full items-center justify-center bg-black bg-opacity-40`}
    >
      <div className='w-1/2 bg-white rounded px-8 py-6 space-y-4'>
        <div className='flex items-center justify-between text-lg font-semibold pb-4 border-b-2 border-gray-100'>
          <div>
            <p>Kreiranje razreda</p>
          </div>
          <div>
            <button onClick={() => toggle(false)}>x</button>
          </div>
        </div>
        <form className='space-y-6'>
          <div className='flex flex-col space-y-4 text-sm'>
            <label htmlFor='majors' className='font-semibold'>
              Odjeljenje <span className='text-red-600'>*</span>
            </label>
            <select
              id='majors'
              className='py-2 pl-[2px] pr-4 border-[1px] shadow outline-none rounded'
            >
              <option value='default'>Odaberi odjeljenje</option>
              {allMajors.map((major) => (
                <option key={major.id} value={major.name}>
                  {major.name}
                </option>
              ))}
            </select>
          </div>
          <div className='flex w-full space-x-4'>
            <div className='w-1/2 flex flex-col space-y-2 text-sm'>
              <label htmlFor='type' className='font-semibold'>
                Tip škole <span className='text-red-600'>*</span>
              </label>
              <select
                id='type'
                onChange={(e) => setSchoolType(e.target.value)}
                className='py-2 pl-[2px] pr-4 border-[1px] shadow outline-none rounded'
              >
                <option value='default'>Odaberi tip škole</option>
                <option value='primary-school'>Osnovna škola</option>
                <option value='high-school'>Srednja škola</option>
              </select>
            </div>
            <div className='w-1/2 flex flex-col space-y-2 text-sm'>
              <label htmlFor='type' className='font-semibold'>
                Godina <span className='text-red-600'>*</span>
              </label>
              <select
                id='type'
                className='py-2 pl-[2px] pr-4 border-[1px] shadow outline-none rounded'
              >
                <option value='default'>Odaberi godinu</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                {schoolType !== 'high-school' && (
                  <>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                    <option value='7'>7</option>
                    <option value='8'>8</option>
                    <option value='9'>9</option>
                  </>
                )}
              </select>
            </div>
          </div>
          <div className='flex flex-col space-y-2 text-sm'>
            <label htmlFor='professor' className='font-semibold'>
              Profesor
            </label>
            <select
              id='professor'
              className='py-2 pl-[2px] pr-4 border-[1px] shadow outline-none rounded'
            >
              <option value='default'>Odaberi profesora</option>
              {allProfessors.map((professor) => (
                <option key={professor.id} value={professor.email}>
                  {professor.firstName} {professor.lastName}
                </option>
              ))}
            </select>
          </div>
          <div className='flex flex-col space-y-2 text-sm'>
            <label htmlFor='student' className='font-semibold'>
              Učenici
            </label>
            <select
              id='student'
              className='py-2 pl-[2px] pr-4 border-[1px] shadow outline-none rounded'
            >
              <option value='default'>Odaberi učenike</option>
              {allStudents.map((student) => (
                <option key={student.id} value={student.email}>
                  {student.firstName} {student.lastName}
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

export default NewClassModal;
