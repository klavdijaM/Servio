// the server - starts the backend, opens port, listens for requests
const app = require('./app'); // runs app.js
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})
