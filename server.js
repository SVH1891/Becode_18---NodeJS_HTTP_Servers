/*const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>Hello World</h1>');
    res.end();
    
});

const port = 3000;

// Start the server
server.listen(port, () => {
    console.log(`Node.js HTTP server is running on port ${port}`);
});
*/

const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Hello, Express.js Server!</h1>');
});

const port = process.env.PORT || 3000; 

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})