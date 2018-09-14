const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

module.exports = {
    takeShift : function(takeShiftInfo) {

        MongoClient.connect(url, (err, client) => {
            const db = client.db('FinalProject');
            const cmpAccounts = db.collection('cmpAccounts');

            // Just need to make title and desc values dynamic!!!
            cmpAccounts.update(
                {"companyName" : takeShiftInfo.companyName},
                {$push : {"positions.$[position].filledShifts" : {"title" : takeShiftInfo.shiftTitle, "Desc" : takeShiftInfo.shiftDesc, "user" : takeShiftInfo.user} } },
                { arrayFilters : [ {"position.name" : takeShiftInfo.position} ] }
            )
            // cmpAccounts.update(
            //     {"companyName" : takeShiftInfo.companyName},
            //     {$pull: {"positions.$[position].openShifts" : {"title" : "OC2", "Desc" : "none"} } },
            //     {arrayFilters : [ {"position.name" : takeShiftInfo.position} ] }
            // )
        });
    }
}