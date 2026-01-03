

let display = document.getElementById('display');

setInterval(() => {
    
    let time = new Date();
    let hour = time.getHours().toString().padStart(0,2);
    let min = time.getMinutes().toString().padStart(0,2);
    let sec = time.getSeconds().toString().padStart(0,2);
    hour = hour % 12 || 12;
    let ampm = hour >= 12 ? "AM":"PM";
    display.innerHTML = `${hour}:${min}:${sec} ${ampm}`;
}, 1000);

