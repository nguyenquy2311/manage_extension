import { getExtensionData } from "../controller/mainController.js";

function setOriginLogoColor(logo) {
    logo.setAttribute('fill', 'white');
}

function getLogoColor(currentValue) {
    return currentValue == "white" ? "#091540" : "white";
}

function getButtonStatus(button, isLightMode) {
    return isLightMode
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 22 22"><g clip-path="url(#a)"><path stroke="#FBFDFE" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.98" d="M11 1.833v1.834m0 14.666v1.834M3.667 11H1.833m3.955-5.212L4.492 4.492m11.72 1.296 1.297-1.296M5.788 16.215l-1.296 1.296m11.72-1.296 1.297 1.296M20.167 11h-1.834m-2.75 0a4.583 4.583 0 1 1-9.167 0 4.583 4.583 0 0 1 9.167 0Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h22v22H0z"/></clipPath></defs></svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 22 22"><g clip-path="url(#a)"><path stroke="#091540" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.98" d="M20.125 11.877A7.333 7.333 0 1 1 10.124 1.875a9.168 9.168 0 1 0 10.001 10.002Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h22v22H0z"/></clipPath></defs></svg>`;
}

function changeButtonMode(button) {
    button.classList.toggle("isLightButtonMode");
}

function changeBodyMode(body) {
    body.classList.toggle('isLightBodyMode');
}

function changeHeaderFormMode(form) {
    form.classList.toggle('isLightFormMode');
}

function switchModeTheme(button, body, logo, form) {
    let isLightMode = true;
    button.addEventListener('click', function (e) {
        let currentValue = logo.getAttribute("fill");
        currentValue = getLogoColor(currentValue);
        logo.setAttribute("fill", currentValue);
        isLightMode = !isLightMode;
        button.innerHTML = getButtonStatus(button, isLightMode);
        changeButtonMode(button);
        changeBodyMode(body);
        changeHeaderFormMode(form);
    })
}
function renderFilterButton() {
    let myButton = document.querySelector(".header__content--option").children;
    myButton[0].style.backgroundColor = "hsl(3, 71%, 56%)";
    Array.from(myButton).forEach((element, i) => {
        myButton[i].addEventListener('click', (e) => {
            // xóa hết các thuộc tính cũ 
            Array.from(myButton).forEach((element) => {
                element.style.backgroundColor = "hsl(225, 23%, 24%)";
            });
            myButton[i].style.backgroundColor = "hsl(3, 71%, 56%)";
        });
    })
}



export function renderListExtensions(data) {
    const listItems = document.querySelector('.listItems');
    data.forEach((element, index) => {
        listItems.innerHTML +=
            `<div class="listItems__element element_1">
          <div class="elementContent">
            <img src=${element.logo} alt="logo">
            <div class="elementTitle">
              <h3>${element.name}</h3>
              <p>${element.description}</p>
            </div>
          </div>
          <div class="elementAction">
            <button>Remove</button>
            <input type="checkbox" id="checkbox${index}">
            <label for="checkbox${index}"></label>
          </div>
        </div>`
    });

}

export function addEventSearchExtention(data) {
    const formInput = document.querySelector('.header > form > input');
    formInput.addEventListener("input", (e) => {
        console.log(e.target.value.toLowerCase());
        data.forEach((element, index) => {
            if (element.name.toLowerCase().includes(e.target.value.toLowerCase()))
                console.log(element.name);
        })
    })
}

function handleExtensionsData(){
    let extensionsData = getExtensionData();
    extensionsData  
        // Bắt khi promise 
        .then(data => {
            renderListExtensions(data);
            addEventSearchExtention(data);
        })
        .catch(data => {
            renderListExtensions(data);
        })
}

function main() {
    const button = document.querySelector('.header > form > button');
    const body = document.querySelector('body');
    const logo = document.querySelector('.header > form > svg > path');
    const headerForm = document.querySelector('.header > form');
    setOriginLogoColor(logo);
    switchModeTheme(button, body, logo, headerForm);
    renderFilterButton();
    handleExtensionsData(); //async 
}
main();





