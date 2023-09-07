import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../services/api';

type TClassDetails = {
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

interface romanNumbers {
  [key: number]: string;
}

const numberConvert: romanNumbers = {
  1: 'I',
  2: 'II',
  3: 'III',
  4: 'IV',
};

const ClassDetails = () => {
  const params = useParams();
  const [classDetails, setClassDetails] = useState<TClassDetails | null>(null);

  useEffect(() => {
    const fetchClassById = async () => {
      await api
        .get(`/api/admin/class/get/${params.id}`)
        .then((response) => {
          setClassDetails(response.data.data);
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    };
    fetchClassById();
  }, [params]);

  return (
    <>
      <div className='w-5/6'>
        <div className='flex items-center text-lg font-semibold pl-6 w-full h-16 border-b-[1px]'>
          {classDetails &&
            `${numberConvert[classDetails.year]}-${
              classDetails.major?.department
            }`}
        </div>
        <div className='flex space-x-8 px-6 pt-8'>
          <div className='w-1/3 border-[1px] rounded-lg py-2 px-4 space-y-4'>
            <p className='text-xl'>Prosječna ocjena</p>
            <p className='text-2xl font-bold'>3.6</p>
          </div>
          <div className='w-1/3 border-[1px] rounded-lg py-2 px-4 space-y-4'>
            <p className='text-xl'>Ukupno izostanaka</p>
            <p className='text-2xl font-bold'>147</p>
          </div>
          <div className='w-1/3 border-[1px] rounded-lg py-2 px-4 space-y-4'>
            <p className='text-xl'>Broj učenika</p>
            <p className='text-2xl font-bold'>22</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassDetails;
