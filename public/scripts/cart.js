const deleteBtns = document.querySelectorAll(".deleteBtns");
const balance = document.getElementById("balance");
const checkout = document.getElementById("checkout");
let paid = document.getElementById("paid");

deleteBtns.forEach(button => {
    console.log("Hey")
    button.addEventListener("click",() => {
        const retrievedArray = getCookie("CartArray")
        const objectIndex = retrievedArray[button.id];
        let updatedPrice = getCookie("Current balance") - objectIndex.priceText;

        retrievedArray.splice(button.id, 1);

        setCookie("Current balance", updatedPrice, 2);
        setCookie("CartArray", retrievedArray, 2);
        window.location.reload();

        if(updatedPrice === 0){

        }
    })
})

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


if(checkout){
    checkout.addEventListener("click", ()=>{


        if (Number(balance.innerText) == 0){
            alert("Insufficient Funds")
            acctDetails.innerHTML = `<p> PAY HERE </p>`
            acctDetails.innerHTML +=`<p> BTC =>  bc1qh2g93tgmk6h40p978r7s5wnmhn06fv726zyu3c <button id="copyBTC"> Copy </button>  </p>  <p> UsdtTrc20 => TS4YcYuGH2kJpePVKAZGnpfVD4bN22sooE <button id="copyUSDT"> Copy </button><p> `
            paid.style.display = "block"

            const btcButton = document.getElementById("copyBTC");
            const usdtButton = document.getElementBy("copyUSDT");
            
            btcButton.addEventListener("click", () => {
                navigator.clipboard.writeText("bc1qh2g93tgmk6h40p978r7s5wnmhn06fv726zyu3c");
                alert("BTC address copied!");
            });
            
            usdtButton.addEventListener("click", () => {
                navigator.clipboard.writeText("TS4YcYuGH2kJpePVKAZGnpfVD4bN22sooE");
                alert("UsdtTrc address copied!");
            });
        }
    
        else{
        }
    })
}

if(paid){
    paid.addEventListener("click", ()=>{
        acctDetails.innerText = "Your order would be delivered to your email after your payment is confirmed"
        checkout.style.display = "none"
        
    })
}