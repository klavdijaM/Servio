// connecting database to the backend
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, 'servio.db'); // database file servio.db will live in the same folder as db.js

// open (or if it doesn't exist yet, create) the database at the given path and run the callback func after
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Failed to connect to the database', err);
    } else {
        console.log('Connected to the database');
    }
})

module.exports = db;
