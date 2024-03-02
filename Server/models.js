const pool = require('./database');

const createTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS records (
        sno SERIAL PRIMARY KEY,
        customer_name VARCHAR(255),
        age INT,
        phone VARCHAR(15),
        location VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await pool.query(query);
  } catch (error) {
    console.error('Error creating table:', error.message);
  }
};

module.exports = {
  createTable,
};
