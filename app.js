
var isError = false;
var isTesting = false;

var startSearch = function(){
    isError = false;
    var startVal = parseInt(document.getElementById("rangeStart").value);
    var endVal = parseInt(document.getElementById("rangeStop").value);
    if (startVal > endVal){
        endVal = parseInt(document.getElementById("rangeStart").value);
        startVal = parseInt(document.getElementById("rangeStop").value);
    }
    var displayContainer = document.getElementById("primesOutput");
    displayContainer.innerHTML = '';
    var primeNumbers = [];
    if (isNaN(startVal) == false && isNaN(endVal) == false){
        // can't have a start value less than 2
        startVal = (startVal > 2 ? startVal : 2);
        primeNumbers = findPrimes(endVal);
        // when adding to display, show only from our selected starting value
        for (var i = startVal, j = primeNumbers.length; i < j; i++) {
            if (primeNumbers[i] === true){
                displayContainer.innerHTML = displayContainer.innerHTML + i + " ";
            }
        }
    } else {
        isError = true;
        if (isTesting === false){
            alert("must have a start and end value");
        }
    }
};

var findPrimes = function(stop){
    //must always start from beginning (2) since this method eliminates non prime numbers as it goes
    //if we start from the start range we won't have the small enough factors to work with
    var primes = [];
    // mark all numbers as prime true to begin
    for(var i = 2; i <= stop; i++) {
        primes[i] = true;
    }
    //any multiples will be less than the square root
    var limit = Math.sqrt(stop);
    for(var i = 2; i <= limit; i++) {
        // number may be eliminated already
        if(primes[i] === true) {
            //loop to eliminate all numbers that have multiples
            for(var j = i*i; j <= stop; j += i) {
                primes[j] = false;
            }
        }
    }
    return primes;
};

var runTests = function(){
    // very low tech unit tests;
    isTesting = true;
    // test basic range function using 7900 to 7920
    console.log("");
    console.log("Should display basic range from 7900 to 7920");
    document.getElementById("rangeStart").value = 7900;
    document.getElementById("rangeStop").value = 7920;
    document.getElementById("primesOutput").innerHTML = '';
    startSearch();
    if (document.getElementById("primesOutput").innerHTML == "7901 7907 7919 "){
        console.log("test passed: Output::"+document.getElementById("primesOutput").innerHTML);
    } else {
        console.log("!! test failed");
    }

    // test inverted range function using 7920 to 7900
    console.log("");
    console.log("Should display inverted range from 7920 to 7900");
    document.getElementById("rangeStart").value = 7920;
    document.getElementById("rangeStop").value = 7900;
    document.getElementById("primesOutput").innerHTML = '';
    startSearch();
    if (document.getElementById("primesOutput").innerHTML == "7901 7907 7919 "){
        console.log("test passed: Output::"+document.getElementById("primesOutput").innerHTML);
    } else {
        console.log("!! test failed");
    }

    // test range beginning with 1
    console.log("");
    console.log("Should exclude number range lower than 2");
    document.getElementById("rangeStart").value = 1;
    document.getElementById("rangeStop").value = 10;
    document.getElementById("primesOutput").innerHTML = '';
    startSearch();
    if (document.getElementById("primesOutput").innerHTML == "2 3 5 7 "){
        console.log("test passed: Output::"+document.getElementById("primesOutput").innerHTML);
    } else {
        console.log("!! test failed");
    }

    // test range beginning with 1
    console.log("");
    console.log("Should produce error");
    document.getElementById("rangeStart").value = '';
    document.getElementById("rangeStop").value = 10;
    document.getElementById("primesOutput").innerHTML = '';
    startSearch();
    if (isError === true){
        console.log("test passed: Error present");
    } else {
        console.log("!! test failed");
    }
    isError = false;
    isTesting = false;
    document.getElementById("rangeStart").value = "";
    document.getElementById("rangeStop").value = "";
    document.getElementById("primesOutput").innerHTML = "";
};

window.onload = function() {
    runTests();
};
