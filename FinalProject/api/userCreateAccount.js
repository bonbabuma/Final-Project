const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

module.exports = {
    newUserAccount : function(createAccount, companyName, username, password, position, loginInfo) {

        MongoClient.connect(url, (err, client) => {
            const db = client.db('FinalProject');
            const cmpAccounts = db.collection('cmpAccounts');
            const userAccounts = db.collection('userAccounts');

            if (createAccount == "yes") {
                // let usersArray = `positions.${id}.users`
                cmpAccounts.update(
                    {"companyName" : companyName, "positions.name" : position},
                    {$addToSet: {"positions.0.users" : {"name" : username} } }, 
                    
                )

                // need to fix multiple insert problem
                userAccounts.insertOne(
                    {
                        "name" : username,
                        "password" : password,
                        "companyName" : companyName,
                        "position" : position
                    },
                    () => {
                    userAccounts.find({
                        "name" : username,
                        "password" : password
                    }).toArray((err, userObj) => {

                        let userInfo = {
                            "companyName" : userObj[0].companyName,
                            "position" : userObj[0].position,
                            "name" : username
                        }

                        test(userInfo)
                    })

                    let test = (userInfo) => {
                        cmpAccounts.find({
                            "companyName" : userInfo.companyName,
                        }).toArray((err, cmpAccount) => {
                            let position = cmpAccount[0].positions.find((pos) => {
                                return pos.name == userInfo.position
                            })
                            let loginObj = {
                                "username" : userInfo.name,
                                "companyName" : userInfo.companyName,
                                "position" : position
                            }
                            loginInfo(loginObj)
                        })
                    }
                })
                // need to add shifts
                
                //multiple insert problem fix idea

                // let addUserAccount = () => {
                //     userAccounts.update(
                //         { "_id" : i},
                //         { $setOnInsert : 
                //             {
                //                 "name" : username,
                //                 "password" : password
                //             }
                //         },
                //         { "upsert" : true}
                //     )

                //     i+=1
                // }
                // addUserAccount()

            } else {

                userAccounts.find({
                    "name" : username,
                    "password" : password
                }).toArray((err, userObj) => {

                    let userInfo = {
                        "companyName" : userObj[0].companyName,
                        "position" : userObj[0].position,
                        "name" : username
                    }

                    test(userInfo)
                })

                let test = (userInfo) => {
                    cmpAccounts.find({
                        "companyName" : userInfo.companyName,
                    }).toArray((err, cmpAccount) => {
                        let position = cmpAccount[0].positions.find((pos) => {
                            return pos.name == userInfo.position
                        })

                        // console.log("test1"+position.name)
                        // console.log("test2"+userInfo.position)
                        // console.log("test3"+cmpAccount[0].positions[0].name)
                        let loginObj = {
                            "username" : userInfo.name,
                            "companyName" : userInfo.companyName,
                            "position" : position
                        }
                        loginInfo(loginObj)
                    })
                }
            }
        })
    } 
}