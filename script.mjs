import { userDetails } from './Fb_io.mjs';
import {
fb_authenticate,
fb_initialise,
fb_readRecords,
fb_writeRecords,
fb_sortedRead,
} from '/Fb_io.mjs';

let message = {
    text:'n/a',
    uid:'n/a',
}

let maxTexts = 5;

console.log(new Date().getTime());
var messageId;


var messageSpace = document.getElementById("welcomeMessage");
var textInput = document.getElementById("textInput");

var changeHeaderBtn = document.getElementById("headerChangeBtn");
var sendMessageBtn = document.getElementById("sendMessageBtn");
var readMessageBtn = document.getElementById("readMessageBtn");

var messageOutput = document.getElementById("messageOutput");

messageSpace.innerHTML = "You've connected to the JavaScript!";

changeHeaderBtn.addEventListener("click", () => {
    changeHeading();
});

sendMessageBtn.addEventListener("click", () => {
    sendMessage();
});

readMessageBtn.addEventListener("click", () => {
    readMessage();
});

function changeHeading(){
    messageSpace.innerHTML = textInput.value;
}

function sendMessage(){
    message.text = textInput.value;
    message.uid = userDetails.uid;
    messageId = (new Date().getTime()*100) + Math.floor(Math.random() * 100);

    fb_writeRecords("messages/" + messageId, message);

}

async function readMessage(){
    const texts = await fb_sortedRead("messages");
    console.log(texts);
    messageOutput.innerText = "";
    
    for(let i=0; i<texts.length; i++){
        let message = document.createElement("li");
        console.log("counter");
        message.textContent = texts[i].value.text;
        messageOutput.appendChild(message);
    }
}


fb_initialise();

fb_authenticate();