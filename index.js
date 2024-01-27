let triArr = document.querySelectorAll('.tri');
let side1 = document.getElementById('side1')
let side1Arr=[]
let side2 = document.getElementById('side2')
let side2Arr=[]
let triContainerArr = document.querySelectorAll('.tri-container')
let tiles = document.querySelectorAll('.tile')
let allDice = document.querySelectorAll('.dice')
let allDiceButMid = [...allDice].filter((_,i)=>i<5||i>6)
let allLeftDice = document.getElementById('dice-container1')
let allRightDice = document.getElementById('dice-container2')
let firstLeftDice = allDice[5]
let firstRightDice = allDice[6]
let midDice = [firstLeftDice,firstRightDice]
let btnDisplay = document.querySelector('.bet')
let p1Bet
let p2Bet
let betArr = []
let test = []

const gray = `border-bottom: 18rem solid grey;`
const brown = `border-bottom: 18rem solid brown;`
//change triangle colors with modulo
triArr.forEach((tri,i)=>i%2!==0 ? tri.style = gray : tri.style = brown)


// target player sides & bring them to edge of board
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
// console.log(side1Arr)
// console.log(side2Arr)
let side1Btm = side1.getBoundingClientRect().y
let side2Btm = side2.getBoundingClientRect().y+side2.getBoundingClientRect().height

side1Arr.forEach(tri=>{
    let triHeight=tri.getBoundingClientRect().y
    tri.style=`transform:translate(0,${triHeight-side1Btm}px)`  
})
console.log(side2Btm)
side2Arr.forEach(tri=>{
    let triY=tri.getBoundingClientRect().y+tri.getBoundingClientRect().height
        tri.style=`transform:translate(0,${(side2Btm - triY)}px)`
})

// Identify al dice except middle
for(let index = 0; index < allDiceButMid.length;index++){
    // center dice in line with the first 2 on each side
    allDiceButMid[index].style=`position:absolute;`
}



let t1=[]
let t2=[]
let shuffleRandomDice = () => {
    // method
    let arr = [allLeftDice,allRightDice]
    let i = 0;
    let children = allLeftDice.children
    let len = children.length
    // add z-index to bring last dice to top
    let z = -1;
// generate random dice
function randomDice(){
    // store random dice into a variable
    let randomNum = children[Math.floor(Math.random()*children.length)]
    return randomNum
}
    for(i,z;len > i && z < 5;len--,z++){
        
        setTimeout(()=>{
            let n = randomDice()
            let ch = children[len]
            ch=n
            console.log(ch)
            ch.classList.remove('disappear')
            ch.classList.add('appear')
            ch.style = `z-index:99${z};position:absolute;`
            setTimeout(()=>{
            ch.style = `z-index:none;position:absolute;`
        
    },1200)
         t1.push(ch)
        },1000*(z+1))
        
    }
    // setTimeout(()=>{
    //     return [...children].forEach(child=>{
    //         child.style=`z-index:none;position:absolute;`
    //         child.classList.add('disappear')
    //         child.classList.remove('appear')
    //     })
    // },8000)
    
}
function iPlay(){
    btnDisplay.textContent = 'You go first' 
}
function theyPlay(){
    btnDisplay.textContent = 'They go first' 
}
