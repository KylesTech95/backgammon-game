let triArr = document.querySelectorAll('.tri');
const gray = `border-bottom: 18rem solid grey;`
const brown = `border-bottom: 18rem solid brown;`
//change triangle colors with modulo
triArr.forEach((tri,i)=>i%2!==0 ? tri.style = gray : tri.style = brown)