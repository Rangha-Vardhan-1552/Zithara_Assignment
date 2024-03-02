const pool = require('./database');
const { createTable } = require('./models');

const seedDatabase = async () => {
  await createTable();

  try {
    const dummyData = [
      { customer_name: 'John Doe', age: 25, phone: '123-456-7890', location: 'New York' },
      { customer_name: 'Jane Doe', age: 30, phone: '987-654-3210', location: 'Los Angeles' },
      { customer_name: 'Ranga ', age: 30, phone: '987-654-3210', location: 'Paris' },
      // Add more dummy data as needed
    ];

    const values = dummyData.map(data => `('${data.customer_name}', ${data.age}, '${data.phone}', '${data.location}')`).join(', ');

    const query = `
      INSERT INTO records (customer_name, age, phone, location) VALUES
      ${values}
    `;

    await pool.query(query);
    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Error seeding database:', error.message);
  } finally {
    pool.end();
  }
};

seedDatabase();
