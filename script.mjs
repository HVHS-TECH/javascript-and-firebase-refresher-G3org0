import { userDetails } from './Fb_io.mjs';
import {
fb_authenticate,
fb_initialise,
fb_readRecords,
fb_writeRecords
} from '/Fb_io.mjs';



var messageSpace = document.getElementById("welcomeMessage");
var textInput = document.getElementById("textInput");

var changeHeaderBtn = document.getElementById("headerChangeBtn");
var sendMessageBtn = document.getElementById("sendMessageBtn");

messageSpace.innerHTML = "You've connected to the JavaScript!";

changeHeaderBtn.addEventListener("click", () => {
    changeHeading();
});

sendMessageBtn.addEventListener("click", () => {
    sendMessage();
});

function changeHeading(){
    messageSpace.innerHTML = textInput.value;
}

function sendMessage(){
    console.log("sending");
    fb_writeRecords("messages/" + userDetails.uid, textInput.value);
}


fb_initialise();

fb_authenticate();