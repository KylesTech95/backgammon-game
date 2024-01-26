let triArr = document.querySelectorAll('.tri');

//change triangle colors by mod
triArr.forEach((tri,i)=>i%2!==0 ? tri.style = `border-bottom: 18rem solid grey;` : tri.style = `border-bottom: 18rem solid brown;`)