let allDatesOnload = document.querySelectorAll(".input-block__text");
let datesArray = document.querySelector(".dates");
let paymentArray = document.querySelector(".payment");
let datePickerArr = Array.from(datesArray.querySelectorAll(".input-block__date")); 
let dateTextArr = Array.from(datesArray.querySelectorAll(".input-block__text"));
let paymentTextArr = Array.from(paymentArray.querySelectorAll(".input-block__text")); 
let selfcheckElems = Array.from(document.querySelectorAll(".input-block_selfcheck"));
let statusToggle = Array.from(document.querySelectorAll(".input-block__checkbox"))

window.onload = (event) => {

    allDatesOnload.forEach(elem => {
        let currentDate = new Date();
        let boop = currentDate.toLocaleDateString();
        let boopArr = boop.split('/').reverse().join('-');
        elem.value = boopArr;
    })
};

class Key {
    constructor(name,arrayDate,arrayPay){
        this.name = name;
        this.arrayDate = arrayDate.split(",");
        this.arrayPay = arrayPay.split(",");
    }
};

//для автоматического добавления новых keyDates window.onload проверка date_ nodes?



let keyDatesArr = [
    new Key("Производство","100,97,86,77,73,62,50","84,79,73,65"),
    new Key("Загрузка","50,47,36,27,23,12","34,29,23,15"), 
    new Key("Отправление судна","37,34,23,15,11","17,22,11,3"),
    new Key("Прибытие судна","26,24,13,4","6,11,1"),
    new Key("Выпуск таможня","22,20,8","7,2"),
    new Key("Отправление поезда","14,11","1"),
    new Key("Прибытие поезда","2","0"),
];

datePickerArr.forEach(elem => {
    let dateField = elem.closest(".input-block__wrapper").previousElementSibling;
    dateField.style.width = "30%";
    elem.addEventListener("input", event => {
        let dateTitle = elem.closest(".input-block").firstElementChild;
        let dateKey = keyDatesArr.filter(date => date.name === dateTitle.textContent);
        let dateTextArrReverse = dateTextArr.reverse();
        let paymentTextArrReverse = paymentTextArr.reverse();
        selfcheckElems.forEach(elem => {
            elem.textContent = "Дни не прибавлены.";
        });
        
        dateField.value = elem.value;

         for (let i=0; i<dateKey[0].arrayDate.length; i++) {
            let dateKeyArr = dateKey[0].arrayDate;
            let timestamp = Number(Date.parse(elem.value))+(dateKeyArr[i]*24*60*60*1000); //dateTextArrReverse[i]
            console.log(dateField.value);
            let newDate = new Date(timestamp);
            let boop = newDate.toLocaleDateString();
            let boopArr = boop.split('/').reverse().join('-');
            dateTextArrReverse[i].value = boopArr;
            let selfCheck = dateTextArrReverse[i].closest(".input-block").lastElementChild;
            selfCheck.textContent = `Дней прибавлено: + ${dateKeyArr[i]}`;

         }
         for (let i=0; i<dateKey[0].arrayPay.length; i++) {
            if (dateKey[0].arrayPay[0] === "0") {
                break;
            } else {
            let paymentArr = dateKey[0].arrayPay;
            let timestamp = Number(Date.parse(elem.value))+(paymentArr[i]*24*60*60*1000); //paymentTextArrReverse[i]
            let newDate = new Date(timestamp);
            let boop = newDate.toLocaleDateString();
            let boopArr = boop.split('/').reverse().join('-');
            paymentTextArrReverse[i].value = boopArr;
            let selfCheck = paymentTextArrReverse[i].closest(".input-block").lastElementChild;
            selfCheck.textContent = `Дней прибавлено: + ${paymentArr[i]}`;

         }
        }
        dateTextArrReverse = dateTextArrReverse.reverse();
        paymentTextArrReverse = paymentTextArrReverse.reverse();
    });

});

statusToggle.forEach(elem => {
    elem.addEventListener("click", event => {
        elem.classList.toggle("status-unfinished");
        elem.classList.toggle("status-finished");
    })
})
 
//elem.addEventListener("change", event => {
//  if loadingDate
//};
//If statement: connected field's value changes the value changes by adding respective number of days

//Solution 1: put an eventListener on each type of date
//Solution 2: write a function that takes in parameter 
//querySelect elem's parent class "date_" => function(class of the elem){if ("date_") {use certain Array and add to certain dates}}

//Solution 3: write function within a function
//querySelect elem's parent class "date_" => function(class of the elem){if ("date_") {use certain Array and add to certain dates}}

//let loadingDate = document.querySelector(".date_loading");
//let shipDepartureDate = document.querySelector(".date_ship-departure"); 
//let shipArrivalDate = document.querySelector(".date_ship-arrival");
//let customsDate = document.querySelector(".date_customs");
//let trainDepartureDate = document.querySelector(".date_train-departure");
//let trainArrivalDate = document.querySelector(".date_train-arrival");
//let warehouseDate = document.querySelector(".date_warehouse");
//let chinaDeliveryPay = document.querySelector(".date_china-delivery-payment");
//let customsPay = document.querySelector(".date_customs-payment");
//let russiaDeliveryPay = document.querySelector(".date_russia-delivery-payment");
//let brokerPay = document.querySelector(".date_broker");
