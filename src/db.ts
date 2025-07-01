import { Sequelize } from "sequelize";

const db = new Sequelize("postgres://admin:admin123@localhost:5432/notes"); // Example for postgres

export default db;
