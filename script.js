const selectMenu = document.querySelectorAll("select");
const currenttime = document.querySelector("h1");
const setalarmbtn = document.querySelector("button");
const content = document.querySelector(".content");

let alarmTime = "", isAlarmSet = false;
let ringtone = new Audio("./audio/ringtone.mp3");

// Populate hours, minutes, and AM/PM options
for(let i = 12; i > 0; i--){
    let hour = i < 10 ? "0" + i : i;
    let option = `<option value="${hour}">${hour}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);     
}

for(let i = 59; i >= 0; i--){
    let minute = i < 10 ? "0" + i : i;
    let option = `<option value="${minute}">${minute}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);     
}

for(let i = 2; i > 0; i--){
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);     
}

// Update the current time every second and check alarm
setInterval(() => {
    let date = new Date(),
        h = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds(),
        ampm = h >= 12 ? "PM" : "AM";

    h = h % 12 || 12; // Convert hour to 12-hour format
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    currenttime.innerText = `${h}:${m}:${s} ${ampm}`;

    // Compare formatted time with alarmTime
    if (isAlarmSet && alarmTime === `${h}:${m} ${ampm}`) {
        ringtone.play();
        ringtone.loop = true;
    }
}, 1000);

function setAlarm() {
    if (isAlarmSet) {
        alarmTime = "";
        ringtone.pause();
        content.classList.remove("disable");
        setalarmbtn.innerText = "Set Alarm";
        isAlarmSet = false;
    } else {
        let hour = selectMenu[0].value;
        let minute = selectMenu[1].value;
        let ampm = selectMenu[2].value;

        if (hour === "Hour" || minute === "Minutes" || ampm === "AM/PM") {
            alert("Please, select a valid time to set the alarm!");
            return;
        }

        alarmTime = `${hour}:${minute} ${ampm}`;
        isAlarmSet = true;
        content.classList.add("disable");
        setalarmbtn.innerText = "Clear Alarm";
    }
}

// Event listener for the alarm button
setalarmbtn.addEventListener("click", setAlarm);
