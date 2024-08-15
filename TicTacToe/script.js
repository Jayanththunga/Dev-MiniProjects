let boxes = document.querySelectorAll(".box")
let winnerdisplay = document.querySelector("#Winner-display")
let resetbtn = document.querySelector("#reset-button")
let restart = document.querySelector("#restart-button")



let turn = "X"
let winner = null
restart.disabled = true

let winningPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  

boxes.forEach(box => {
    box.addEventListener("click", ()=>{
        if(turn=="X"){
            box.innerHTML = "X"
            turn = "O"
        }else{
            box.innerHTML = "O"
            turn = "X"
        }
        box.disabled = true
        checkWinner()
    })
});

function displayWinner(){
    winnerdisplay.innerHTML = "Round Winner is " + winner
}

function checkWinner() {
    winningPatterns.forEach(pattern => {
        if(boxes[pattern[0]].innerHTML===boxes[pattern[1]].innerHTML 
            && boxes[pattern[1]].innerHTML===boxes[pattern[2]].innerHTML && (boxes[pattern[0]].innerHTML==="X" ||boxes[pattern[0]].innerHTML ==="O")){
                   winner = boxes[pattern[0]].innerHTML
                   displayWinner()
                   diableAllboxes()
                   resetbtn.disabled = true
                   restart.disabled = false
            }
    });
}

function diableAllboxes() {
    boxes.forEach(box => {
        box.disabled = true
   });
}

function clearAndEnableAllboxes() {
    boxes.forEach(box => {
        box.disabled = false
        box.innerHTML = ""
    });
}

resetbtn.addEventListener("click", ()=>{
    turn = "X"
    winner = null
    clearAndEnableAllboxes()
})


restart.addEventListener("click", ()=>{
    turn = "X"
    winner = null
    winnerdisplay.innerHTML = ""
    clearAndEnableAllboxes()
    restart.disabled = true
    resetbtn.disabled = false
})
