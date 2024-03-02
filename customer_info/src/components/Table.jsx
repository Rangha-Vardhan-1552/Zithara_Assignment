import React from 'react';

const Table = ({ records }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>S.No</th>
          <th>Customer Name</th>
          <th>Age</th>
          <th>Phone</th>
          <th>Location</th>
          <th>Date</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {records.map(record => (
          <tr key={record.sno}>
            <td>{record.sno}</td>
            <td>{record.customer_name}</td>
            <td>{record.age}</td>
            <td>{record.phone}</td>
            <td>{record.location}</td>
            <td>{record.date}</td>
            <td>{record.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
