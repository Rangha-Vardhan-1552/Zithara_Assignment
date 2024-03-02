import React from 'react';

const Table = ({ records }) => {
  return (
<div class="relative overflow-x-auto ">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">S.No</th>
                <th scope="col" class="px-6 py-3">Customer Name</th>
                <th scope="col" class="px-6 py-3">Age</th>
                <th scope="col" class="px-6 py-3">Phone Number</th>
                <th scope="col" class="px-6 py-3">Location</th>
                <th scope="col" class="px-6 py-3">Created_ At</th>
            </tr>
        </thead>
        <tbody>
        {records.map(record => (
         <tr  key={record.sno} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {record.sno}
            </th>
            <td class="px-6 py-4">
              {record.customer_name}  
            </td>
            <td class="px-6 py-4">
              {record.age}
            </td>
            <td class="px-6 py-4">
              {record.phone}
            </td>
            <td class="px-6 py-4">
              {record.location}
            </td>
            <td class="px-6 py-4">
              {record.created_at}
            </td>
        </tr>
        ))}
            
        </tbody>
    </table>
</div>

  );
};

export default Table;
