const express = require('express');
const pool = require('./database');

const router = express.Router();

// Get records with search, sort, pagination, and skip
router.get('/records', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      name = '',
      location = '',
      date = '',
      time = '',
      startIndex = 0,
      sortDate = 'asc', // Added sortOrder parameter
      sortTime='asc'
    } = req.query;

    const offset = (page - 1) * limit + parseInt(startIndex);

    const whereConditions = [];
    const queryParams = [];

    if (name) {
      whereConditions.push(`customer_name ILIKE $${queryParams.length + 1}`);
      queryParams.push(`%${name}%`);
    }

    if (location) {
      whereConditions.push(`location ILIKE $${queryParams.length + 1}`);
      queryParams.push(`%${location}%`);
    }

    if (date) {
      whereConditions.push(`TO_CHAR(created_at, 'YYYY-MM-DD') = $${queryParams.length + 1}`);
      queryParams.push(date);
    }

    if (time) {
      whereConditions.push(`TO_CHAR(created_at, 'HH24:MI:SS') = $${queryParams.length + 1}`);
      queryParams.push(time);
    }

    let whereClause = '';
    if (whereConditions.length > 0) {
      whereClause = 'WHERE ' + whereConditions.join(' AND ');
    }

    const query = `
      SELECT
        sno,
        customer_name,
        age,
        phone,
        location,
        TO_CHAR(created_at, 'YYYY-MM-DD') AS extracted_date,
        TO_CHAR(created_at, 'HH24:MI:SS') AS time
      FROM
        records
      ${whereClause}
      ORDER BY
        extracted_date ${sortDate}, time ${sortTime}
      LIMIT
        ${limit} OFFSET ${offset};
    `;

    const result = await pool.query(query, queryParams);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching records:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Insert data
router.post('/insert_data', async (req, res) => {
  try {
    const { customer_name, age, phone, location } = req.body;

    const values = `('${customer_name}', ${age}, '${phone}', '${location}')`;

    const query = `
      INSERT INTO records (customer_name, age, phone, location) VALUES
      ${values}
    `;

    await pool.query(query);
    res.json({ success: true, message: 'Data inserted successfully' });
  } catch (error) {
    console.error('Error inserting data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
