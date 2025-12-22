import mysql from "mysql2/promise";

const connection = await mysql.createPool({
   host: "localhost",
   user: "root",
   password: "admin-1234",
   database: "lift_tracker",
   port: 3307,
   waitForConnections: true,
   connectionLimit: 10,
   queueLimit: 0,
   enableKeepAlive: true,
   keepAliveInitialDelay: 0,
});

export default connection;
