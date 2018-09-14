const express = require('express');
const server = express();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});
const jsonParser = bodyParser.json()
const cmpCreate = require('./api/cmpCreateAccount.js');
const userCreateAccountStep2 = require('./api/userCreateAccountStep2.js');
const userCreateAccount = require('./api/userCreateAccount.js');
const cmpApi = require('./api/cmpApi.js');
const userApi = require('./api/userApi');
const port = 3000;

server.set('view engine', 'pug');
server.use(express.static(__dirname+'/public'));

server.get('/', (req, res) => {
    res.render('staticPug/homepage', {})
});
    
server.get('/company/createAccount', (req, res) => {
    res.render('staticPug/cmpCreate', {})
});
server.post('/company', urlencodedParser, (req, res) => {
    let companyName = req.body.companyName
    let password = req.body.password
    let confirmPassword = req.body.confirmPassword
    let createAccount = req.body.createAccount
    let cmpLogin = (loginInfo) => {
            res.render('accounts/companyAccount', {loginInfo})
        }

    cmpCreate.newCmpAccount(companyName, password, confirmPassword, createAccount, cmpLogin)

});

server.get('/user/createAccount', (req, res) => {
    res.render('staticPug/userCreate', {})
});
server.post('/user/createAccount/step2', urlencodedParser, (req, res) => {
    let companyName = req.body.companyName;
    let username = req.body.username;
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;
    let callback = (userCreateInfo) => {
        console.log("it worked")
        res.render('staticPug/userCreateStep2', {userCreateInfo})
    }

    userCreateAccountStep2.newUserAccount(companyName, username, password, confirmPassword, callback)

})
server.post('/user', urlencodedParser, (req, res) => {
    //create account
    let createAccount = req.body.createAccount;
    let companyName = req.body.companyName;
    let username = req.body.username;
    let password = req.body.password;
    let position = req.body.position;

    let loginInfo = (loginObj) => {
        res.render('accounts/userAccount', {loginObj, loginObjString : JSON.stringify(loginObj)})
    }
    
    userCreateAccount.newUserAccount(createAccount, companyName, username, password, position, loginInfo)
    
    //login
    // MongoClient.connect(url, function(err, client) {
    //     console.log('connected to the mongoDB server');

    //     const db = client.db('FinalProject');
    //     const collection = db.collection('userAccounts');
    //     collection.find({}).toArray((err, document) => {
    //         // res.render('accounts/userAccount', {username, companyName, document});
    //         client.close();
    //     });
    // });
});
server.post('/api', jsonParser, (req, res) => {

        let takeShiftInfo = req.body;
        console.log("test1", takeShiftInfo);
        userApi.takeShift(takeShiftInfo);
        res.sendStatus(200);
});
server.post('/cmpApi', jsonParser, (req, res) => {

    let newItem = req.body;
    console.log("test1", newItem);
    cmpApi.createPos(newItem);
});

server.listen(port, (err) => {
    if (err) {
        console.log(`There is an error: ${err}`)
    }
    console.log(`Running on server: ${port}`)
});