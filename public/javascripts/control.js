"use strict";
let popupclock;
let timeout1;
let timeout2;
function buttonClick(buttonId) {
    console.log(buttonId);
    $.post("/action", 'newscene=' + buttonId, function (data) {
        console.log(data);
    });

}
function toggleStream() {
    $.post("/action/togglestream", '', function (data) {
        console.log(data);
    });

}

function fibbageStart(seconds) {
    window.popupclock.stop();
    window.clearTimeout(timeout1);
    window.clearTimeout(timeout2);
    buttonClick('fibbage1');
    resetClock(seconds);
    window.popupclock.start();
    timeout1 = setTimeout(function(){
        buttonClick('fibbage2');
    },15000);
    timeout2 = setTimeout(function(){
        buttonClick('fibbage3');
    },seconds*1000);
}

function resetClock (seconds) {
    console.log("reset clock called");
    window.popupclock.setTime(seconds);
    //window.popupclock.start();
}


let popup = window.open('/timer.html', 'timerWindow', 'titlebar=no,height=200,width=400');
if (!popup) {
    alert("popup error");
}

document.getElementById('fibbagestart').onclick = function() {
    let seconds = document.getElementById('seconds').value;
    fibbageStart(seconds);
};
