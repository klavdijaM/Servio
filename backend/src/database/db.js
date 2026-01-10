// connecting database to the backend
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs'); // file system module - allows reading files from disk

const dbPath = path.join(__dirname, 'servio.db'); // database file servio.db will live in the same folder as db.js
const schemaPath = path.join(__dirname, 'schema.sql');

// open (or if it doesn't exist yet, create) the database at the given path and run the callback func after
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Failed to connect to the database', err);
    } else {
        console.log('Connected to the database');
    }

    const schema = fs.readFileSync(schemaPath, 'utf8');

    db.exec(schema, (err) => {
        if (err) {
            console.error('Failed to execute schema', err);
            return;
        }

        db.get('SELECT COUNT(*) as count FROM restaurants', (err, row) => {
            if (err) {
                console.error('Failed to check seed status', err);
                return;
            }

            if (row.count === 0) {
                console.log('Seeding database...');
                require('./seed');
            } else {
                console.log('Database already seeded');
            }
        });
    });

});

module.exports = db;
