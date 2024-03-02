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

  return (
    <div>
      <h1>Record Management System</h1>
      <Search onSearch={handleSearch} />
      <Table records={filteredRecords} />
      <Pagination
        currentPage={currentPage}
        totalRecords={records.length}
        recordsPerPage={recordsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default App;
