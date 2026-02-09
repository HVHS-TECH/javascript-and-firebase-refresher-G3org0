import {
fb_authenticate,
fb_initialise
} from '/Fb_io.mjs';



var messageSpace = document.getElementById("welcomeMessage");
var headerTextInput = document.getElementById("headerTextInput");

messageSpace.innerHTML = "You've connected to the JavaScript!";

function ChangeHeading(){
messageSpace.innerHTML = headerTextInput.value;
}//TEst commit


fb_initialise();

fb_authenticate();