const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

module.exports = {
    newUserAccount : function userAccount (companyName, username, password, confirmPassword, callback) {
        if (password == confirmPassword) {

            MongoClient.connect(url, (err, client) => {
                const db = client.db('FinalProject');
                const collection = db.collection('cmpAccounts');

                collection.find({
                    "companyName": companyName
                }).toArray(function(err, company) {
                    if (company[0] != undefined) {
                        let userCreateInfo = {
                            companyName : companyName,
                            positions : company[0].positions,
                            username : username,
                            password : password
                        }
                        callback(userCreateInfo)
                    } else {
                        callback("err") //say error
                    }
                })
            })
        } else {
            console.log("passwords don't match")
            return "err 2"
        }
    }
}
