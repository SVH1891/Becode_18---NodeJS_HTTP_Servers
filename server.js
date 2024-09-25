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

const fs = require('fs');
const path = require('path');

// Serve static files from the current directory (for HTML, CSS, etc.)
app.use(express.static(path.join(__dirname)));

// Root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Dynamic route to serve HTML files based on the URL, avoiding conflicts with users/products routes
app.get('/:page', (req, res, next) => {
    const page = req.params.page;

    if (page === 'users' || page === 'products') return next();

    const filePath = path.join(__dirname, `${page}.html`);
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.status(404).send('<h1>404 Not Found</h1>');
        } else {
            res.sendFile(filePath);
        }
    });
});

// Include route files
const usersRoute = require('./routes/users');
const productsRoute = require('./routes/products');

// Use routes
app.use('/users', usersRoute);
app.use('/products', productsRoute);

const port = process.env.PORT || 3000; 

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`http://localhost:${port}`);
});
