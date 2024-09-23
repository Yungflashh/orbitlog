const textDiss = document.getElementById("textDiss");
const usa = document.getElementById("usa");
const textFAQ = document.getElementById("textFAQ");
const shop = document.getElementById("shop");
const uk = document.getElementById("uk");
const other = document.getElementById("other");
const company = document.getElementById("company");
const canada = document.getElementById("canada");
const citiLog = document.getElementById("citiLog");
const branches = document.getElementById("branches");
const logsList = document.getElementById("logsList");
const citiLogSection = document.getElementById("citiLogSection");
const USABanksContent = document.getElementById("USABanksContent");

setInterval(() => {
        let cookies = getCookie("CartArray");
        if(!cookies){
            currentBalance.innerText = 0;
        } 
        else{
            currentBalance.innerText = getCookie("Current balance");
        }
    }, 1000);

usa.addEventListener("click", (event) => {
        let target =  event.target.id
        disappear(target);
})

shop.addEventListener("click", (event)=>{
        let target =  event.target.id
        disappear(target);
})

uk.addEventListener("click", (event)=>{
        let target =  event.target.id
        disappear(target);
})

other.addEventListener("click", (event)=>{
        let target =  event.target.id
        disappear(target);
})

company.addEventListener("click", (event)=>{
        let target =  event.target.id
        disappear(target);
})

canada.addEventListener("click", (event)=>{
        let target =  event.target.id
        disappear(target);
})

function disappear(target){
        console.time();
        const array = ["usa", "shop", "uk", "other", "company", "canada"];
        const foundElement = array.find(element => element === target);
        const newElement = document.querySelectorAll(`.${foundElement}`);
        newElement[0].classList.remove("Diss");
        const filteredArray = array.filter(element => element != target);
        
        filteredArray.forEach(element => {
                const restElementArray = document.querySelectorAll(`.${element}`);
                restElementArray[0].classList.add("Diss");
        })

        textDiss.classList.add('Diss');
        textFAQ.classList.add('Diss');
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
