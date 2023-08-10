const http = require('http');

const server = http.createServer((req, res) => {

const url = req.url;

if (url === '/') {
res.writeHead(200, { 'Content-Type': 'text/plain' });
res.end('Welcome to my Node.js project\n');
} else if (url === '/home') {
res.writeHead(200, { 'Content-Type': 'text/plain' });
res.end('Welcome home\n');
} else if (url === '/about') {
res.writeHead(200, { 'Content-Type': 'text/plain' });
res.end('Welcome to About Us page\n');
} else if (url === '/node') {
res.writeHead(200, { 'Content-Type': 'text/plain' });
res.end('Welcome to my Node.js project\n');
} else {
res.writeHead(404, { 'Content-Type': 'text/plain' });
res.end('404 - Not Found\n');
}
});

server.listen(3003, () => {
console.log('Server is listening on port 3003');
});