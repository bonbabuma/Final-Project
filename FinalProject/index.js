const express = require('express');
const server = express();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017'
const port = 3000;

server.set('view engine', 'pug');
server.use(express.static('public'));

server.get('/', (req, res) => {
    res.render('homepage', {})
});
    server.use(express.static(__dirname+'/public'));
server.get('/company/createAccount', (req, res) => {
    res.render('cmpCreate', {})
});

server.get('/user/createAccount', (req, res) => {
    res.render('userCreate', {})
});
    server.use(express.static(__dirname+'/public'));
server.get('/company', (req, res) => {
    res.render('company.pug', {})
}); 
server.get('/user', (req, res) => {
    MongoClient.connect(url, function(err, client) {
    console.log('connected to the mongoDB server');

    const db = client.db('FinalProject');
    const collection = db.collection('userAccounts');
    collection.find({}).toArray((err, documents) => {
        res.render('userAccount', {documents: documents});
        client.close(); 
    });
});
})


server.listen(port, (err) => {
    if (err) {
        console.log(`There is an error: ${err}`)
    }
    console.log(`Running on server: ${port}`)
});