window.onload = function () {
    const createPos = document.getElementsByClassName('createPos');
    const createShift = document.getElementsByClassName('createShift')

    createPos[0].onclick = () => {
        let newPos = prompt('Please insert position name');
        newPosCallback(newPos);
    }
    let newPosCallback = (newPos) => {
        console.log(newPos)
        let newPosString = JSON.stringify({"newPosName" : newPos, "companyName" : cmpInfoString.companyName});
        this.fetch('/cmpApi', {method : 'post', body : newPosString, headers : {"Content-Type" : 'application/json'}});
    }

    createShift[0].onclick = ()=> {
        let newShiftPosition = prompt("Please input position you wish to input shift");
        let newShiftTitle = prompt("Please input shift title");
        let newShiftDesc = prompt('Please input description of shift');
        let newShiftObj = {
            "newShift" : "yes",
            "companyName" : cmpInfoString.companyName,
            "newShiftPosition" : newShiftPosition,
            "newShiftTitle" : newShiftTitle,
            "newShiftDesc" : newShiftDesc
        };
        newShiftCallback(newShiftObj);
    };
    let newShiftCallback = (newShiftObj) => {
        console.log(newShiftObj);
        let newShiftObjString = JSON.stringify(newShiftObj);
        this.fetch('/cmpApi', {method : 'post', body : newShiftObjString, headers : {"Content-Type" : 'application/json'}});
    };

console.log(cmpInfoString);
}