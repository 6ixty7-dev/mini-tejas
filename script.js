let t = document.getElementById("tejas");
let msg = document.getElementById("msg");

let eyes = document.querySelectorAll(".eye");
let mouth = document.querySelector(".mouth");

let x=window.innerWidth/2;
let y=window.innerHeight/2;
let tx=x, ty=y;
let lastMove=Date.now();

/* ENTER */
function enterApp(){
    document.getElementById("intro").style.display="none";
    msg.innerText="hi Glania… I’ve been waiting 🥺";
}

/* FOLLOW */
function loop(){
    let dx = tx-x;
    let dy = ty-y;

    x += dx*0.08;
    y += dy*0.08;

    t.style.left = x+"px";
    t.style.top = y+"px";

    /* WALK DETECTION */
    if(Math.abs(dx)>5 || Math.abs(dy)>5){
        t.classList.add("walk");
        t.classList.remove("idle");
    } else {
        t.classList.remove("walk");
        t.classList.add("idle");
    }

    lookAtCursor();

    requestAnimationFrame(loop);
}
loop();

/* INPUT */
document.addEventListener("mousemove",move);
document.addEventListener("touchmove",move);

function move(e){
    lastMove=Date.now();
    tx = e.touches?e.touches[0].clientX:e.clientX;
    ty = e.touches?e.touches[0].clientY:e.clientY;
}

/* EYES FOLLOW */
function lookAtCursor(){
    let dx = tx-x;
    let dy = ty-y;

    let angle = Math.atan2(dy,dx);

    let ox = Math.cos(angle)*3;
    let oy = Math.sin(angle)*3;

    eyes.forEach(e=>{
        e.style.transform = `translate(${ox}px, ${oy}px)`;
    });
}

/* BLINK */
setInterval(()=>{
    eyes.forEach(e=>e.style.height="2px");
    setTimeout(()=>eyes.forEach(e=>e.style.height="14px"),150);
},3000);

/* EXPRESSIONS */
function setFace(type){
    mouth.style.height="10px";
    mouth.style.borderBottom="3px solid black";

    if(type==="happy") mouth.style.height="20px";
    if(type==="kiss"){
        mouth.style.borderBottom="none";
        mouth.style.borderRadius="50%";
    }
    if(type==="angry"){
        mouth.style.borderBottom="none";
        mouth.style.height="2px";
    }
    if(type==="laugh") mouth.style.height="25px";
}

/* ACTIONS */
function hug(){
    setFace("happy");
    msg.innerText="stay forever 💕";
}

function kiss(){
    setFace("kiss");
    msg.innerText="UMMA 😵‍💫❤️";
}

function tickle(){
    setFace("laugh");
    msg.innerText="HAHAHA 😂";
}

function slap(){
    setFace("angry");
    msg.innerText="HEY 😤";
    t.style.animation="shake 0.3s";
}

/* TAP REACTION */
t.addEventListener("click",()=>{
    setFace("happy");
    msg.innerText="hehe 😳";
});

/* IDLE */
let idle=[
"kuttaaaa 🥺",
"evde?? poyo?",
"Glaniaaaaaa 😭",
"don't leave me 🫣"
];

setInterval(()=>{
    if(Date.now()-lastMove>7000){
        msg.innerText=idle[Math.floor(Math.random()*idle.length)];
        setFace("happy");
    }
},2000);

/* ONE PIECE */
let taps=0;
document.addEventListener("click",()=>{
    taps++;
    if(taps===6){
        document.querySelector(".hat").style.display="block";
        msg.innerText="Welcome to the crew 🏴‍☠️❤️";
    }
});
