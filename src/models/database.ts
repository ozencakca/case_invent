import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  dialect: 'postgres',
  logging: true,
  pool: {
    max: 20,
    min: 2,
    acquire: 30000,
    idle: 1000,
  },
});

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((err) => {
    setTimeout(() => {
      sequelize
        .authenticate()
    }, 1000);
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;
