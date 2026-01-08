const currentBalance = document.getElementById("currentBalance");
const buttons = document.querySelectorAll(".buttons");
const balance = document.querySelectorAll(".balance");
const info = document.querySelectorAll(".info");

let cartArray = [];

citiLogs.addEventListener("click", event => {
    const target = event.target.id;
    console.log(target)
    disappear(target);
})

woodForest.addEventListener("click", event => {
    const target = event.target.id;
    console.log(target)
    disappear(target);
})

chimeLog.addEventListener("click", event => {
    const target = event.target.id;
    console.log(target)
    disappear(target);
})
NCFU.addEventListener("click", event => {
    const target = event.target.id;
    console.log(target)
    disappear(target);
})
BBVA.addEventListener("click", event => {
    const target = event.target.id;
    console.log(target)
    disappear(target);
})
BBT.addEventListener("click", event => {
    const target = event.target.id;
    console.log(target)
    disappear(target);
})
BOA.addEventListener("click", event => {
    const target = event.target.id;
    console.log(target)
    disappear(target);
})
Suntrust.addEventListener("click", event => {
    const target = event.target.id;
    console.log(target)
    disappear(target);
})
MT.addEventListener("click", event => {
    const target = event.target.id;
    console.log(target)
    disappear(target);
})
TD.addEventListener("click", event => {
    const target = event.target.id;
    console.log(target)
    disappear(target);
})
Hunt.addEventListener("click", event => {
    const target = event.target.id;
    console.log(target)
    disappear(target);
})
Chase.addEventListener("click", event => {
    const target = event.target.id;
    console.log(target)
    disappear(target);
})

setInterval(() => {
    let cookies = getCookie("CartArray");
    if(!cookies){
        currentBalance.innerText = 0;
    } 
    else{
        currentBalance.innerText = getCookie("Current balance");
    }
}, 1000);



buttons.forEach(button => {
    button.addEventListener("click", (event) => {
        let convert = Number(button.id);
        let currentBalText = Number(currentBalance.innerText);
        currentBalText += convert;
        currentBalance.innerText = currentBalText;
    
        setCookie("Current balance", currentBalance.innerText, 2);
        let balanceText;
        let infoText;

        balanceText = button.parentElement.parentElement.getElementsByClassName("balance");
        balanceText = balanceText[0].innerText;

        infoText = button.parentElement.parentElement.getElementsByClassName("info");
        infoText = infoText[0].innerText;

        const objects = {
            checkings: "Checkings Account",
            bal: balanceText,
            information: infoText,
            priceText: button.id,
        }

        let gottenCookie = getCookie("CartArray");

        if(gottenCookie){
            gottenCookie = [...gottenCookie, objects];
            setCookie("CartArray", gottenCookie, 2);
        }
        else{
            cartArray.push(objects);
            setCookie("CartArray", cartArray, 2);
        }

    })    
})


function disappear(target){
    console.time();
    const array = ["citiLogs", "woodForest", "chimeLog", "NCFU", "BBVA", "BBT", "BOA", "Suntrust", "MT", "TD", "Hunt", "Chase"];
    const foundElement = array.find(element => element === target);
    const newElement = document.querySelectorAll(`.${foundElement}`);
    newElement[0].classList.remove("Diss");
    const filteredArray = array.filter(element => element != target);
    
    filteredArray.forEach(element => {
            const restElementArray = document.querySelectorAll(`.${element}`);
            restElementArray[0].classList.add("Diss");
    })
    console.timeEnd();
}



function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000)); // Set expiration time
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + JSON.stringify(value) + ";" + expires + ";path=/";
}


function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) return JSON.parse(c.substring(nameEQ.length, c.length));
    }
    return null;
}