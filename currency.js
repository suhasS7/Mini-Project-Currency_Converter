let amount = document.querySelector(".enter");
console.log(amount);

const baseUrl = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll("#dropdowns select");

const button = document.querySelector("button");
const fromcurr = document.querySelector("#select1");
const tocurr = document.querySelector("#select2");
const msg = document.querySelector("#msg");



for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        }
        else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateExchangeRate = async ()=>{
    let amount = document.querySelector(".enter");
    let amtVal = amount.value;

    if (amtVal < 1 || amtVal === "") {
        amtVal = 1;
        amount.value = "1";
    }

    // console.log(fromcurr.value,tocurr.value);
    const URL = `${baseUrl}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[tocurr.value.toLowerCase()];

    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal}  ${fromcurr.value} = ${finalAmount}  ${tocurr.value}`;


};

const updateFlag = (element) => {

    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;

}

button.addEventListener("click",  (evt) => {
    evt.preventDefault();
    updateExchangeRate();
    
});

window.addEventListener("load",()=>{
    updateExchangeRate();
});



