const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

module.exports = {
    newCmpAccount: function(companyName, password, confirmPassword, createAccount, cmpLogin) {
        MongoClient.connect(url, (err, client) => {
            const db = client.db('FinalProject');
            const collection = db.collection('cmpAccounts');
        
            if (createAccount == "yes") {

                if(password == confirmPassword) {

                    collection.insertOne({
                        "companyName" : companyName,
                        "password" : password,
                        "positions" : []
                    })

                    collection.find({
                        "companyName" : companyName,
                        "password" : password
                    }).toArray((err, cmpAccount) => {
                        if (cmpAccount == undefined) {
                            console.log("incorrect username or password")
                        } else {
                            let loginInfo = {
                                "companyName" : cmpAccount[0].companyName,
                                "positions" : cmpAccount[0].positions
                            }
                            cmpLogin(loginInfo)
                        }
                    })
                } else {
                    console.log("passwords don't match");
                }

            } else {
                collection.find({
                    "companyName" : companyName,
                    "password" : password
                }).toArray((err, cmpAccount) => {
                    if (cmpAccount == undefined) {
                        //say incorrect username or password
                    } else {
                        let loginInfo = {
                            "companyName" : cmpAccount[0].companyName,
                            "positions" : cmpAccount[0].positions
                        }
                        cmpLogin(loginInfo)
                    }
                })
            }
        })
    }
}
