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

        console.log('Data insert successfully :', response.data);

      } catch (error) {
        console.error('Error sending data:', error.message);
      }
    };


  const HandleInputChange =(e)=>{
    setFormData({
      ...formData ,
      [e.target.id]:e.target.value
    });

  };

  console.log(formData)

  return (
    <>
    <div className='p-3 max-w-lg mx-auto shadow-lg hover:shadow-2xl hover:bg-gray-100 mt-7'>
      <h1 className='text-3xl font-semibold text-center my-7'>Customer Registration</h1>
      <div className='flex flex-col gap-4'>
        <input type='text' placeholder='customer name' className='border p-3 rounded-lg ' id='customer_name' onChange={HandleInputChange}></input>
        <input type='text' placeholder='age' className='border p-3 rounded-lg ' id='age' onChange={HandleInputChange}></input>
        <input type='number' placeholder='phone' className='border p-3 rounded-lg ' id='phone' onChange={HandleInputChange}></input>
        <input type='text' placeholder='location' className='border p-3 rounded-lg ' id='location' onChange={HandleInputChange}></input>
        <button className='border p-3 rounded-lg bg-slate-700 uppercase text-white hover:opacity-90 disabled:opacity-80' onClick={submitHandler}>
          submit
        </button>
      </div>
      </div>
    <div className='text-center m-7 p-3'>
      <h1 className='text-slate-700 font-semibold text-center text-3xl'>Customer Details</h1>
      <div className='flex flex-row justify-between max-w-6xl mb-6'>
      <Search onSearch={handleSearch} />
        <button id="dropdownHoverButton" data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Sort <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
        </svg>
        </button>

        <div id="dropdownHover" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
              <li>
                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Date</a>
              </li>
              <li>
                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Time</a>
              </li>
            </ul>
        </div>

      </div>
      
      <Table records={filteredRecords} />
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
