import React, { useState } from 'react';
import {FaSearch} from 'react-icons/fa'

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = e => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
      <div className='bg-slate-100 p-3 rounded-lg flex items-center max-w-xs ' > 
        <input type='text' placeholder='Search by Name or Location'  value={searchTerm}  onChange={handleChange} className='bg-transparent focus:outline-none w-24 sm:w-64'/>
        <button><FaSearch className='text-slate-600'/></button>           
      </div>
  );
};

export default Search;
