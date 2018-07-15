function checkCashRegister(price, cash, cid) {
  
    
    
    "use strict";
    
    var changeArr = [],
        changeDue = cash - price,
        changeSum,
        cidSum = 0,
        currentIndex = cid.length - 1;
    
    function getNumberOfUnits(unit) {
        if (changeDue < unit) {
            if (currentIndex > 0) {
                currentIndex--;
            }
            return;
        }

        var numberOfUnits = Math.floor(changeDue / unit);

        if (numberOfUnits * unit > cid[currentIndex][1]) {
            changeArr.push([cid[currentIndex][0], cid[currentIndex][1]]);
            changeDue = Math.round((100 * (changeDue - cid[currentIndex][1]))) / 100;
            if (currentIndex > 0) {
                currentIndex--;
            }
            return;
        }

        changeArr.push([cid[currentIndex][0], numberOfUnits * unit]);
        changeDue = Math.round((100 * (changeDue - (numberOfUnits * unit)))) / 100;

        if (currentIndex > 0) {
            currentIndex--;
        }
    }
    

    getNumberOfUnits(100);
    getNumberOfUnits(20);
    getNumberOfUnits(10);
    getNumberOfUnits(5);
    getNumberOfUnits(1);
    getNumberOfUnits(0.25);
    getNumberOfUnits(0.1);
    getNumberOfUnits(0.05);
    getNumberOfUnits(0.01);

    changeArr.forEach(function (subArr) {
        changeSum += subArr[1];
    });

    cid.forEach(function (subArr) {
        cidSum += subArr[1];
    });

    if (changeSum < changeDue) {
        return {status: "INSUFFICIENT_FUNDS", change: []};
    }

    if (cash - price === cidSum) {
        return {status: "CLOSED", change: cid};
    }

    return {status: "OPEN", change: changeArr};

}
