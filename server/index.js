import pkg from 'pg';
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";


/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Postgres configuration
const { Pool } = pkg;
const pool = new Pool({
    user: process.env.DB_USER,
    host: 'db',
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });
  (async () => {
    try {
      await createTable();
      const port = process.env.PORT || 3000;
      app.listen(port, () => {
        console.log(`Server running on port ${port}`);
      });
    } catch (err) {
      console.error(err);
    }
  })();

  const createTable = async () => {
    try {
      const client = await pool.connect();
      await client.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name TEXT,
          email TEXT UNIQUE
        )
      `);
      console.log("Successfully created table users");
      client.release();
    } catch (err) {
      console.error(err);
    }
  };

  createTable();


  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  // Example endpoint to get data from your PostgreSQL database
  app.get('/data', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM users');
      const results = { 'results': (result) ? result.rows : null};
      res.send(results);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  });

  //testing
//   app.get('/testdb', async (req, res) => {
//     try {
//         const client = await pool.connect();
//         await client.query('SELECT NOW()');
//         res.send('Successfully connected to the database');
//         client.release();
//     } catch (err) {
//         console.error(err);
//         res.send('Failed to connect to the database');
//     }
// });

  // Error handling middleware
app.use((err, req, res, next) => {
    res.status(500).send('Server Error');
});

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
