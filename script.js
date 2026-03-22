let t = document.getElementById("tejas");
let msg = document.getElementById("msg");

/* ENTER */
function enterApp(){
    document.getElementById("intro").style.display="none";
    msg.innerText="hi Glania… I’ve been waiting 🥺";
}

/* PAGE SWITCH */
function showPage(id){
    document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

/* FOLLOW SYSTEM */
let x=200,y=200,tx=x,ty=y,lastMove=Date.now();

function loop(){
    x += (tx-x)*0.08;
    y += (ty-y)*0.08;

    t.style.left=x+"px";
    t.style.top=y+"px";

    requestAnimationFrame(loop);
}
loop();

/* INPUT */
function move(e){
    lastMove=Date.now();
    tx = e.touches?e.touches[0].clientX:e.clientX;
    ty = e.touches?e.touches[0].clientY:e.clientY;
}

document.addEventListener("mousemove",move);
document.addEventListener("touchmove",move);

/* STATES */
function setState(s){
    t.src="assets/"+s+".png";
}

/* IDLE */
let idle=[
"kuttaaaa 🥺",
"evde?? poyo?",
"Glaniaaaaaa 😭",
"nan ividundu 🥺",
"evde poyii??",
"don't leave me 🫣"
];

setInterval(()=>{
    if(Date.now()-lastMove>7000){
        setState(Math.random()>0.5?"idle":"idle2");
        msg.innerText=idle[Math.floor(Math.random()*idle.length)];
    }
},2000);

/* PARTICLES */
function hearts(){
    for(let i=0;i<10;i++){
        let h=document.createElement("div");
        h.className="heart";
        h.innerText="❤️";
        h.style.left=(x+Math.random()*60-30)+"px";
        h.style.top=y+"px";
        document.body.appendChild(h);
        setTimeout(()=>h.remove(),1000);
    }
}

/* ACTIONS */
function hug(){
    setState("happy");
    hearts();
    msg.innerText=["don't let go 🥺❤️","stay forever 💕"][Math.floor(Math.random()*2)];
}

function kiss(){
    setState("kiss");
    hearts();
    msg.innerText=["UMMA 😵‍💫❤️","again pls 😳"][Math.floor(Math.random()*2)];
}

function tickle(){
    setState("laugh");
    msg.innerText=["noooo hahaha 🤣","staaaaap 😂"][Math.floor(Math.random()*2)];
}

function slap(){
    setState("angry");
    msg.innerText=["HEY 😤","njan adichu pokum!! 😡"][Math.floor(Math.random()*2)];
}

/* LETTERS */
let letters=[
"Good morning my love ❤️",
"You mean everything to me 🥺",
"I miss you more than I say 💕",
"You’re my favorite person 💞",
"Even on your worst days… I choose you",
"I made this because you matter to me",
"I want more memories with you",
"Just stay. That’s enough for me"
];

let current=0;

function nextLetter(){
    current=(current+1)%letters.length;
    document.getElementById("letterText").innerText=letters[current];
}

/* DAYS COUNTER */
let start=new Date("2025-01-01");
let now=new Date();
let days=Math.floor((now-start)/(1000*60*60*24));
document.getElementById("days").innerText=days;

/* MEMORY GAME */
function startMemory(){
    let emojis=["❤️","💖","🥺","😘","😤","🤣"];
    let cards=[...emojis,...emojis].sort(()=>0.5-Math.random());

    let area=document.getElementById("gameArea");
    area.innerHTML="";

    let flipped=[];

    cards.forEach(e=>{
        let c=document.createElement("div");
        c.className="card";
        c.innerText="❓";

        c.onclick=()=>{
            c.innerText=e;
            flipped.push({c,e});

            if(flipped.length==2){
                if(flipped[0].e!==flipped[1].e){
                    setTimeout(()=>{
                        flipped[0].c.innerText="❓";
                        flipped[1].c.innerText="❓";
                    },500);
                }
                flipped=[];
            }
        };

        area.appendChild(c);
    });
}

/* QUIZ */
function startQuiz(){
    let score=0;

    if(prompt("Fav food?").toLowerCase().includes("chicken")) score++;
    if(prompt("Nickname?").toLowerCase().includes("kutta")) score++;

    alert("Score: "+score+"/2 ❤️");
}

/* ONE PIECE MODE */
let taps=0;
document.addEventListener("click",()=>{
    taps++;
    if(taps==5){
        msg.innerText="Welcome to the crew 🏴‍☠️❤️";
        setState("pirate");

        setTimeout(()=>{
            msg.innerText="I'm your captain now 😏";
        },2000);
    }
});
