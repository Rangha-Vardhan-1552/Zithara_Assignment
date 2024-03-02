const express = require('express');
const pool = require('./database');

const router = express.Router();

// Get all records
router.get('/records', async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const query = `
      SELECT sno, customer_name, age, phone, location, 
        EXTRACT(DAY FROM created_at) AS date, 
        TO_CHAR(created_at, 'HH24:MI:SS') AS time
      FROM records
      ORDER BY created_at
      LIMIT ${limit} OFFSET ${offset};
    `;

    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching records:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


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
