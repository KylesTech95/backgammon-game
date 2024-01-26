let triArr = document.querySelectorAll('.tri');
let side1 = document.getElementById('side1')
let side1Arr=[]
let side2 = document.getElementById('side2')
let side2Arr=[]
let triContainerArr = document.querySelectorAll('.tri-container')
let tiles = document.querySelectorAll('.tile')

const gray = `border-bottom: 18rem solid grey;`
const brown = `border-bottom: 18rem solid brown;`
//change triangle colors with modulo
triArr.forEach((tri,i)=>i%2!==0 ? tri.style = gray : tri.style = brown)


// target side 1
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
console.log(side1Arr)
console.log(side2Arr)

