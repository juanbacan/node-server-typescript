import { Sequelize } from 'sequelize';

const db = new Sequelize('nodeserver', 'postgres', '1234', {
    host: 'localhost',
    dialect: 'postgres',
});

export default db;