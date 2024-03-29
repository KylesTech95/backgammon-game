let triArr = document.querySelectorAll('.tri');
let side1 = document.getElementById('side1')
let side2 = document.getElementById('side2')
let side1Arr=[]
let side2Arr=[]
let betArr=[]
let betArr2=[]
let arr = [betArr,betArr2];
let circ1 = []
let circ2 = []
let available = []
let diceSum;
let available_moves;
let triContainerArr = document.querySelectorAll('.tri-container')
let tiles = document.querySelectorAll('.tile')
let allDice = document.querySelectorAll('.dice')
let allLeftDice = document.getElementById('dice-container1')
let allRightDice = document.getElementById('dice-container2')
let firstLeftDice = allDice[5]
let firstRightDice = allDice[6]
let midDice = [firstLeftDice,firstRightDice]
let btnDisplay = document.querySelector('.bet')
let betBtn = document.querySelector('.bet')
let dice_audio = document.querySelector('audio')
let odd,even;
let lastRollComp,lastRollPlayer
const gray = `border-bottom: 18rem solid grey;`
const brown = `border-bottom: 18rem solid brown;`
let compMove = false, playerMove = false;
let triContainers = document.querySelectorAll('tri-container')
let currentPlayer;
let daddyTri;
let counter = 0;
//change triangle colors with modulo
triArr.forEach((tri,i)=>i%2!==0 ? tri.style = gray : tri.style = brown)

// Event listener module
function eventFn(elem,type,func){
    elem.addEventListener(type,func)
}
function passTile(elem,option){
daddyTri = elem;
eventFn(option,'click',moveOpt)
}

// position triangles to edge of board
for(let i=0;i<triContainerArr.length;i++){
    // console.log(triContainerArr[i])
    // testing for current y position in tri-containers
    let parentSide = triContainerArr[i].parentElement.parentElement;
    if(parentSide.id==='side1'){
        side1Arr.push(triContainerArr[i])
    }
    else{
        side2Arr.push(triContainerArr[i])
    }
}
let side1Btm = side1.getBoundingClientRect().y
let side2Btm = side2.getBoundingClientRect().y+side2.getBoundingClientRect().height

side1Arr.forEach(tri=>{
    let triHeight=tri.getBoundingClientRect().y
    tri.style=`transform:translate(0,${triHeight-side1Btm}px)`  
})
side2Arr.forEach(tri=>{
    let triY=tri.getBoundingClientRect().y+tri.getBoundingClientRect().height
        tri.style=`transform:translate(0,${(side2Btm - triY)}px)`
})
// clear dice after each player finishes their move
function clearDice(){
    triArr.forEach(t=>t.classList.add('no-pointer'))
    console.log('You are done playing this round.')
    lastRollComp = [];
    lastRollPlayer = [];
    setTimeout(()=>{
        allDice.forEach(d=>{
            d.classList.remove('appear')
            d.classList.add('disappear')
        })
    },1000)

   
}

const nextPlayer = () => {
    betBtn.classList.remove('no-pointer')
    setTimeout(()=>{
        if((/player/).test(currentPlayer)){
            betBtn.textContent = `Computer's turn`
            currentPlayer = 'computer'
            playMove('computer')
        } 
        else{
            betBtn.textContent = `Player's turn`
            currentPlayer = 'palyer'
            playMove('player')
        }
    },1000)
}

let shuffleDice = () => {
    triArr.forEach(t=>t.classList.remove('no-pointer'))
    odd = [...allDice].filter((x,i)=>i%2!==0).forEach(d=>d.classList.add('dice-rotate-odd'))
    even = [...allDice].filter((x,i)=>i%2==0).forEach(d=>d.classList.add('dice-rotate-even'))
 


    
 //start shuffle audio
 if(!dice_audio.playing){
     dice_audio.play()
 }
     // set pointer event fofr button to none
     betBtn.classList.remove('no-pointer');
     betBtn.setAttribute('disabled',true)
     betBtn.classList.add('disappear')
     betBtn.classList.remove('appear')
     let leftDice = [...allLeftDice.children]
     let rightDice = [...allRightDice.children]
 
 for(let i = 0; i < leftDice.length; i++){
     let random = leftDice[Math.floor(Math.random()*leftDice.length)]
     betArr.push(random)
 }
 for(let x = 0; x < betArr.length; x++){
     let lefty = leftDice[x]
     lefty=betArr[x]
 
     setTimeout(()=>{
         lefty.classList.remove('disappear')
         lefty.classList.add('appear')
         if(x<betArr.length-1){
             setTimeout(()=>{
                 lefty.classList.add('disappear')
                 lefty.classList.remove('appear') 
             },175)
         }
         else{
                 lefty.classList.remove('disappear')
                 lefty.classList.add('appear') 
             
         }
     },175*(x+1))
 }
 for(let i = 0; i < rightDice.length; i++){
     let random = rightDice[Math.floor(Math.random()*rightDice.length)]
     betArr2.push(random)
 }
 for(let x = 0; x < betArr2.length; x++){
     let righty = rightDice[x]
     righty=betArr2[x]
     setTimeout(()=>{
         
         righty.classList.remove('disappear')
         righty.classList.add('appear')
         if(x<betArr2.length-1){
             setTimeout(()=>{
                 righty.classList.add('disappear')
                 righty.classList.remove('appear') 
             },175)
             
         }
         else{
             righty.classList.remove('disappear')
             righty.classList.add('appear')  
         }
     },175*(x+1))
 }
}




// challenge (beginning of game)
let challengeCoin = () => {
    shuffleDice()
    setTimeout(()=>{
    arr.forEach((side,index) =>{
        let children = [...side]
        let lastRoll = children[side.length-1]
        // console.log(lastRoll)
        if(index===0){
            lastRollComp = [...lastRoll.children].forEach(c=>{
                let children = c.children
                circ1.push(...children)
            })
        }
        else{
            lastRollPlayer = [...lastRoll.children].forEach(c=>{
                let children = c.children
                circ2.push(...children)
            })
        }
        // console.log(circ1)
        // console.log(circ2)
        children.forEach(child=>{
            if(child!==lastRoll){
                child.classList.remove('appear')
                child.classList.add('disappear')
            }
            else{
                child.classList.add('appear')
                child.classList.remove('disappear')
            }
        })
})
    odd = [...allDice].filter((x,i)=>i%2!==0).forEach(d=>d.classList.remove('dice-rotate-odd'))
    even = [...allDice].filter((x,i)=>i%2==0).forEach(d=>d.classList.remove('dice-rotate-even'))
    betBtn.classList.add('no-pointer')
    betBtn.classList.remove('disappear')
    betBtn.classList.add('appear')
    betBtn.removeAttribute('disabled',true)
    
    // store both dice into available_moves
    available_moves = [circ1.length===0?1:circ1.length,circ2.length===0?1:circ2.length,(circ1.length===0?1:circ1.length)+(circ2.length===0?1:circ2.length)]
    // console.log('CLEARED')
    diceSum = (circ1.length===0?1:circ1.length) + (circ2.length===0?1:circ2.length)
    if(circ1.length > circ2.length){
        theyPlay()
    }
    if(circ1.length < circ2.length){
        iPlay()
    }
    if(circ1.length===circ2.length){
        setTimeout(()=>{
                clearDice()
                betBtn.classList.remove('no-pointer')
                btnDisplay.textContent = 'Throw Dice'
        },3000)
        tie()
    }
},1150)
}
//calculate distance from endpoint to startpoint
const theDistance = (end,start,c1,c2) => {
    let e,s,res
    let parent = end.parentElement //tri triangle
    for(let i = 0; i < triArr.length; i++){
        let tCon = triArr[i].children[0];
        if(tCon === end)e=i
        if(tCon === start) s=i
            res = Math.abs(s-e)
    }
        switch(true){
        case res === diceSum:
        nextPlayer()
        clearDice();
        break;
        case res === c1:
        console.log('EQUALS LEFT DICE')
        parent.classList.add('no-pointer')
        break;
        case res === c2:
        console.log('EQUALS RIGHT DICE')
        parent.classList.add('no-pointer')
        break;
        default:
        console.log('undefined')
        break;
    }

}
// moveOption
const moveOpt = (event) => {
    counter+=1
    console.log(counter)
    // console.log(diceSum)
    let c1 = circ1.length===0?1:circ1.length
    let c2 = circ2.length===0?1:circ2.length
    let opt = event.currentTarget
    console.log(opt)
    let container = opt.children[0];
    let tile = daddyTri.children[0]
    let currentTile = tile.children[0]
    let currSide = container.parentElement.parentElement
    theDistance(container,tile,c1,c2)
    // if the player utilizes one dice & then the other.
    if(counter >= 2 ){
        nextPlayer()
        clearDice()
        if(currentTile){
            let take = tile.removeChild(currentTile)
            container.appendChild(take)
            container.style=`transform:translate(0,${currSide.id==='side1'?25 : -25}px)`
        }
}
else{
    // if player utilizes the sum of both dice
    if(currentTile){
        let take = tile.removeChild(currentTile)
        container.appendChild(take)
        container.style=`transform:translate(0,${currSide.id==='side1'?25 : -25}px)`
    }
}
// console.log(container)
// console.log(tile)
// console.log(c1,c2)

}
// determine which moves are available from the targeted triangle
const movesFromTriangle = (tri,moves,who) => {
// console.log(tri)
// console.log(moves)
if((/player/).test(who)){
    for(let i=0; i<triArr.length;i++){
        let opt1 = moves[0], opt2 = moves[1], opt3 = moves[2]
        let options
        if(triArr[i]===tri){
             options = [triArr[i-opt1],triArr[i-opt2],triArr[i-opt3]]
             options = options.filter((x,i)=>x!=undefined&&[...x.children[0].children].every(tile=>!tile.classList.contains('tile-p2'))).forEach((opt,j)=>{
                
                if(opt===undefined){
                    return window
                }
                else{
                opt.style = `border-bottom: 18rem solid gold;transition:.25s;`;   
                
               }        
               passTile(triArr[i],opt) 
             })
         }
    }
}
else{
    for(let i=0; i<triArr.length;i++){
        let opt1 = moves[0], opt2 = moves[1],opt3 = moves[2]
        let options
        if(triArr[i]===tri){
            options = [triArr[i+opt1],triArr[i+opt2],triArr[i+opt3]]
            options = options.filter((x,i)=>x!=undefined&&[...x.children[0].children].every(tile=>!tile.classList.contains('tile-p1'))).forEach((opt,j)=>{
            let tiles = opt.children[0].children
            if(opt===undefined){
                return window
            }
            else{
                opt.style = `border-bottom: 18rem solid gold;transition:.25s;`
            }
            passTile(triArr[i],opt) 
            })
        }
    }
}


}
// user selects triangle to pick from
const useTriangle = (event) => {
let triOption = event.currentTarget
// console.log(triOption)
// console.log(available_moves)

if((/player/).test(currentPlayer)) movesFromTriangle(triOption,available_moves,'player')
if((/computer/).test(currentPlayer)) movesFromTriangle(triOption,available_moves,'computer')


}
const hoverTriangle = (event) => {
let triOption = event.currentTarget
triOption.style = `border-bottom: 18rem solid gold;`
if((/player/).test(currentPlayer)) movesFromTriangle(triOption,available_moves,'player')
if((/computer/).test(currentPlayer))movesFromTriangle(triOption,available_moves,'computer')
}
const leaveTriangle = () => {
    triArr.forEach((tri,i)=>i%2!==0 ? tri.style = `transition:.25s;${gray}` : tri.style = `transition:.25s;${brown}`)
}
const playMove = (who) => {
    if((/player/).test(who)){
        for(let index=0; index<available.length;index++){
            available[index].classList.add('mouse-over')
            eventFn(available[index],'click',useTriangle)
            // eventFn(available[index],'mouseenter',hoverTriangle)
            eventFn(available[index],'mouseleave',leaveTriangle)
        }
        }
    if((/computer/).test(who)){
        for(let index=0; index<available.length;index++){
            available[index].classList.add('mouse-over')
            eventFn(available[index],'click',useTriangle)
            // eventFn(available[index],'mouseenter',hoverTriangle)
            eventFn(available[index],'mouseleave',leaveTriangle)
                
        }
        }

}
const showAvailableMoves = (who) =>{
    // console.log(available_moves)
for(let i=0; i<triContainerArr.length; i++){
    let children = triContainerArr[i].children
    let p1Every = [...children].every(c=>c.classList.contains('tile-p1'))
    let p2Every = [...children].every(c=>c.classList.contains('tile-p2'))
    if(children.length>0){
        if(/player/.test(who)){
                if(p1Every){
                    let triangle = triContainerArr[i].parentElement
                    // console.log(triangle)
                    available.push(triangle)
                }
            }
        if(/computer/.test(who)){
                if(p2Every){
                    let triangle = triContainerArr[i].parentElement
                    // console.log(triangle)
                    available.push(triangle)
                }
            }
    }
}
if(/player/.test(who)){
    playMove(who)
}
if(/computer/.test(who)){
    playMove(who)
}
}









//______________________________

// player plays
function iPlay(){
    btnDisplay.textContent = 'Player moves first'
    showAvailableMoves('player')
    currentPlayer = 'player'
}
// computer plays
function theyPlay(){
    btnDisplay.textContent = 'Computer moves first' 
    showAvailableMoves('computer')
    currentPlayer = 'computer'
}  
// tie
function tie(){
    btnDisplay.textContent = 'Tie'
}

