let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn=document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");    
let turn0 = true;
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];
const resetGame=()=>{
turn0="true";
boxEnable();
msgContainer.classList.add("hide")
};
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");
        if (turn0) {
            box.innerText = ("0");
            turn0 = false;
        } else {
            box.innerText = "X";
            turn0 = true
        }
        box.disabled = true;

        cheackWinner();
    });

});
const boxDisable=()=>{
    for(let box of boxes){
        box.disabled=true;
    }

};

const boxEnable=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }

};

// const showWinner=(winner) => {
// msg.innerText=`congratulations , winner is... ${winner}`;
// msgContainer.classList.remove("hide");
// boxDisable();
// }

const cheackWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val !="" && pos2Val !="" && pos3Val !=""){
            if(pos1Val===pos2Val && pos2Val===pos3Val){
                console.log("winner",pos1Val)
  showWinner(pos1Val);
            }
        }

    }

};
newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);



//congartlations code start from here
const showWinner = (winner) => {
    msg.innerText = `🎉 Congratulations! Winner is ${winner} 🎉`;
    msgContainer.classList.remove("hide");
    boxDisable();

    // Confetti effect
    confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
    });

    // Optional: keep it going for a few bursts
    let duration = 2 * 1000; // 2 seconds
    let end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
};
