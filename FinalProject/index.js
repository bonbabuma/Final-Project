const express = require('express');
const server = express();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017'
const port = 3000;

server.set('view engine', 'pug');
server.use(express.static(__dirname+'/public'));

server.get('/', (req, res) => {
    res.render('homepage', {})
});
    
server.get('/company/createAccount', (req, res) => {
    res.render('cmpCreate', {})
});
server.get('/user/createAccount', (req, res) => {
    res.render('userCreate', {})
});
server.get('/company', (req, res) => {
    //create account
    let companyName = req.query.companyName

    res.render('companyAccount', {companyName})
}); 
server.get('/user', (req, res) => {
    //create account
    let companyName = req.query.companyName;
    let username = req.query.username;
    let password = req.query.password;

  

    MongoClient.connect(url, function(err, client) {
    console.log('connected to the mongoDB server');

    const db = client.db('FinalProject');
    const collection = db.collection('userAccounts');
    collection.find({}).toArray((err, document) => {
        res.render('userAccount', {username, companyName, document});
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