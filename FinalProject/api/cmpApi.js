const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

module.exports = {
    createPos: function (newItem) {
        
        MongoClient.connect(url, (err, client) => {
            const db = client.db('FinalProject');
            const cmpAccounts = db.collection('cmpAccounts');

            if(newItem.newShift == "yes") {
                if(newItem.newShiftDesc != null && newItem.newShiftTitle != null) {
                    console.log(newItem);
                    cmpAccounts.updateOne(
                        {"companyName" : newItem.companyName},
                        {$push: {"positions.$[position].openShifts" : {"title" : newItem.newShiftTitle, "desc" : newItem.newShiftDesc} } },
                        {arrayFilters: [ {"position.name" : newItem.newShiftPosition} ] }
                    )
                } else {
                    console.log('title or desc was null');
                }
            } else {
                if (newItem.newPosName != null) {
                    cmpAccounts.updateOne(
                        {"companyName" : newItem.companyName},
                        {$addToSet: {"positions" : {"name" : newItem.newPosName, "openShifts" : [], "filledShifts" : [], "users" : []}}}
                    )
                    client.close();
                } else {
                    console.log("new position null");
                }
            }
        })
    }
}