const sqlite3 = require('sqlite3').verbose();
const { createPool } = require('generic-pool');

// Create a factory for creating SQLite database connections
const factory = {
  create: () => new sqlite3.Database('./final.db'),
  destroy: (db) => db.close(),
};

// Set the pool options (adjust these according to your needs)
const poolOptions = {
  max: 10, // Maximum number of connections
  min: 2,  // Minimum number of connections
};

// Create the connection pool
const pool = createPool(factory, poolOptions);

module.exports = pool;