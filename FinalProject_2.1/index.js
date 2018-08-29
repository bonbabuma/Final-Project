const express = require('express');
const server = express();
const port = 3000;

server.set('view engine', 'pug');
server.use(express.static('public'));

server.get('/', (req, res) => {
    res.render('homepage', {})
});
    server.use(express.static(__dirname+'/public'));
server.get('/schedule', (req, res) => {
    res.render('schedule', {})
});
    server.use(express.static(__dirname+'/public'));
server.get('/company', (req, res) => {
    res.render('company.pug', {})
}); 

server.listen(port, (err) => {
    if (err) {
        console.log(`There is an error: ${err}`)
    }
    console.log(`Running on server: ${port}`)
});