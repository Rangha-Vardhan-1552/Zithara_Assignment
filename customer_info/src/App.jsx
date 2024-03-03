import React, { useState, useEffect } from 'react';
import Table from './components/Table';
import Search from './components/Search';
import Pagination from './components/Pagination';
import api from './services/api';

function App() {
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [limit,setLimit] = useState(20);
  const [formData, setFormData]= useState({})
  const [success,setSuccess] = useState('')
  const [error, setError] =useState('')
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [sortDate, setSortDate] = useState('asc');
  const [sortTime, setSortTime] = useState('asc');
  const [startIndex, setStartIndex]=useState(0)
  const [showMore, setShowMore] = useState(false)

  useEffect(() => {
    // Initial load of records
    submitSearch();
  }, [page,limit]); // Empty dependency array ensures the effect runs only once

  const submitSearch = () => {
    api.get(`/records`, {
      params: {
        page: 1,
        limit: 20,
        name,
        location,
        date,
        time,
        startIndex: 0,
        sortDate,
        sortTime,
      },
    })
    .then(response => {
      setRecords(response.data);
      if(records.length>=20){
        setShowMore(true)
      }else{
        setShowMore(false)
      }
    })
    .catch(error => {
      console.error('Error fetching records:', error);
    });
  };


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

  const handleShowMore = async () => {
    try {
      setLimit(limit+startIndex)
      const response = await api.get(`/records`, {
        params: {
          page: 1,
          limit,
          name,
          location,
          date,
          time,
          startIndex:limit,
          sortDate,
          sortTime,
        },
      });
  
      const newRecords = response.data;
  
      setRecords((prevRecords) => [...prevRecords, ...newRecords]);
  
      if (newRecords.length < limit) {
        setShowMore(false);
      }else{
        setShowMore(true)
      }
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };
  


      
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
        <label className='text-lg font-semibold'>Time:</label>
        <select id='sortTime' valueclassName='border rounded-lg p-2 mx-5'  value={sortTime} onChange={(e) => setSortTime(e.target.value)}>
        <option value='asc' >ascending</option>
        <option value='desc'>descending</option>
       </select>
      </div>
      <div className='flex flex-row items-center'>
        <label className='text-lg font-semibold'>Date:</label>
        <select id='sortDate' valueclassName='border rounded-lg p-2 mx-5'  value={sortDate} onChange={(e) => setSortDate(e.target.value)}>
        <option value='asc' >oldest </option>
        <option value='desc'>newest</option>
       </select>
      </div>
      <button className='text-white bg-slate-700 rounded-lg p-3' onClick={submitSearch}>Filter</button>
      </div>
      
      <Table records={filteredRecords?filteredRecords:records} />
      {/* <Pagination
        currentPage={page}
        totalRecords={records.length}
        recordsPerPage={limit}
        onPageChange={setPage}
      /> */}
      {showMore && (
          <button className='bg-gray-200 rounded-lg border  hover:underline p-3 px-6  text-center ' onClick={handleShowMore}>Next</button>

          )}
    </div>
    </>
  );
}

export default App;
