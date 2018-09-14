window.onload = function () {
    const userShifts = document.getElementsByClassName('shift');
    let userObj = JSON.parse(userObjString);
    let shiftArray = []
    
    for(i=0; i<=userShifts.length-1; i++) {
        console.log("test5", userShifts[i]);
        shiftArray.push(userShifts[i]);
    };

    console.log("test1", userObj);
    console.log("test2"+userObjString);
    // console.log("test3", userShifts);
    console.log("test4", userShifts);
    console.log("test7", shiftArray);

    shiftArray.forEach( (shift) => {
        console.log("test6", shift);
        
        shift.onclick = () => {
            let takeShiftInfo = JSON.stringify({"companyName" : userObj.companyName, "position" : userObj.position.name, "shiftTitle" : "something", "shiftDesc" : "something", "user" : userObj.username})
            shift.style.display = "none";
            this.fetch('/api', {method : 'post', body : takeShiftInfo, headers : {"Content-Type" : 'application/json'}});
        };
    });

    // (
    //     () => {
    //         this.fetch('/api', {method : 'post', body : userObjString, headers : {"Content-Type" : 'application/json'}})
    //     }
    // )();
    
}