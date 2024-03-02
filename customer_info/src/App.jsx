import React, { useState, useEffect } from 'react';
import Table from './components/Table';
import Search from './components/Search';
import Pagination from './components/Pagination';
import api from './services/api';

function App() {
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(20);
  const [formData, setFormData]= useState({})
  const [success,setSuccess] = useState('')
  const [error, setError] =useState('')
  const [sortOrder, setSortOrder] = useState('time');

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(`/records?page=${currentPage}&limit=${recordsPerPage}`);
      setRecords(response.data);
    };

    fetchData();
  }, [currentPage, recordsPerPage]);


  const handleSearch = term => {
    setSearchTerm(term);
  };

  const filteredRecords = records.filter(record =>
    record.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.location.toLowerCase().includes(searchTerm.toLowerCase())
  );


    const submitHandler = async () => {
      try {
        const response = await api.post('/insert_data', {
          customer_name: formData.customer_name,
          age: formData.age,
          phone: formData.phone,
          location: formData.location,
        
        });
        if(response.status===200){
          setSuccess(response.data.message)
          setError('')
        }
        console.log('Data insert successfully :', response.data);
        setError('')
      } catch (error) {
        setError(error.message)
        setSuccess('')
      }
    };


  const HandleInputChange =(e)=>{
    setFormData({
      ...formData ,
      [e.target.id]:e.target.value
    });

  };

  console.log(formData)

  const sortedRecords = [...filteredRecords].sort((a, b) => {
    const aValue = sortOrder === 'date' ? new Date(a.date) : a.time;
    const bValue = sortOrder === 'date' ? new Date(b.date) : b.time;
  
    if (sortOrder === 'date') {
      return aValue - bValue;
    } else {
      return aValue.localeCompare(bValue);
    }
  });
  
  const renderedRecords = searchTerm ? sortedRecords : filteredRecords;
  

  return (
    <>
    <div className='p-3 max-w-lg mx-auto shadow-lg hover:shadow-2xl hover:bg-gray-100 mt-7'>
      <h1 className='text-3xl font-semibold text-center my-7'>Customer Registration</h1>
      <div className='flex flex-col gap-4 mb-4'>
        <input type='text' placeholder='customer name' className='border p-3 rounded-lg ' id='customer_name' onChange={HandleInputChange} required></input>
        <input type='text' placeholder='age' className='border p-3 rounded-lg ' id='age' onChange={HandleInputChange} required></input>
        <input type='number' placeholder='phone' className='border p-3 rounded-lg ' id='phone' onChange={HandleInputChange} required></input>
        <input type='text' placeholder='location' className='border p-3 rounded-lg ' id='location' onChange={HandleInputChange} required></input>
        <button className='border p-3 rounded-lg bg-slate-700 uppercase text-white hover:opacity-90 disabled:opacity-80' onClick={submitHandler}>
          submit
        </button>
      </div>
      <p className='text-green-800 font-semibold text-center'>{success}</p>
      <p className='text-red-700 font-semibold text-center'>{error}</p>
      </div>
    <div className='text-center m-7 p-3'>
      <h1 className='text-slate-700 font-semibold text-center text-3xl'>Customer Details</h1>
      <div className='flex flex-row justify-between max-w-6xl mb-6'>
      <Search onSearch={handleSearch} />
      <div className='flex flex-row items-center'>
        <label className='text-lg font-semibold'>Sort:</label>
        <select defaultValue='time' className='border rounded-lg p-2 mx-5' onChange={(e) => setSortOrder(e.target.value)}>
        <option value="date" id='date'>date</option>
        <option value="time" id='time'>time</option>
       </select>
      </div>
       
      </div>
      
      <Table records={renderedRecords} />
      <Pagination
        currentPage={currentPage}
        totalRecords={records.length}
        recordsPerPage={recordsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
    </>
  );
}

export default App;
