let triArr = document.querySelectorAll('.tri');
let side1 = document.getElementById('side1')
let side2 = document.getElementById('side2')
let side1Arr=[]
let side2Arr=[]
let betArr=[]
let betArr2=[]
let available = []
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
//change triangle colors with modulo
triArr.forEach((tri,i)=>i%2!==0 ? tri.style = gray : tri.style = brown)

// Event listener module
function eventFn(elem,type,func){
    elem.addEventListener(type,func)
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
    allDice.forEach(d=>{
        d.classList.remove('appear')
        d.classList.add('disappear')
    })
}



// shuffle dice
let shuffleRandomDice = () => {
   odd = [...allDice].filter((x,i)=>i%2!==0).forEach(d=>d.classList.add('dice-rotate-odd'))
   even = [...allDice].filter((x,i)=>i%2==0).forEach(d=>d.classList.add('dice-rotate-even'))

//start shuffle audio
if(!dice_audio.playing){
    dice_audio.play()
}
    // set pointer event for button to none
    betBtn.style.pointerEvents="none";
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

let arr = [betArr,betArr2];
let circ1 = []
let circ2 = []
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
    betArr=[]
    betArr2=[]
    betBtn.style.pointerEvents="none";
    betBtn.classList.remove('disappear')
    betBtn.classList.add('appear')
    betBtn.removeAttribute('disabled',true)
    // console.log('CLEARED')
    if(circ1.length > circ2.length){
        theyPlay()
    }
    if(circ1.length < circ2.length){
        iPlay()
    }
    if(circ1.length===circ2.length){
        setTimeout(()=>{
                clearDice()
                betBtn.style.pointerEvents="auto";
                btnDisplay.textContent = 'Throw Dice'
        },3000)
        tie()
    }
    },1150)
    
}

const useTriangle = (event) => {
let triOption = event.currentTarget
console.log(triOption)
}
const playMove = (who) => {
for(let index=0; index<available.length;index++){
    available[index].classList.add('mouse-over')
    eventFn(available[index],'click',useTriangle)
}
}
const showAvailableMoves = (who) =>{
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
playMove(who)
}






//______________________________

// player plays
function iPlay(){
    btnDisplay.textContent = 'Player moves first'
    showAvailableMoves('player')
}
// computer plays
function theyPlay(){
    btnDisplay.textContent = 'Computer moves first' 
    showAvailableMoves('computer')

}  
// tie
function tie(){
    btnDisplay.textContent = 'Tie'
}

