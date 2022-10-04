   let playerOn=true
   let catObjects = {one:0  , two: 0 , three:0}
   $(document).ready(function(){
            $("#myModal").modal('show');
    });
function getRandomIndex(){
    return Math.floor(Math.random()*50)
}

function getData(key){
    let tempData = null
    let index= getRandomIndex()

	fetch('http://api.worldbank.org/v2/country/?format=json')
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
		tempData = data[1][index]
        while(tempData.capitalCity==""){
            let index= getRandomIndex()
            tempData= data[1][index]
        }

            updateobj(key,tempData)
          

			
		});
}
function updateobj(key, tempData){
catObjects[key]=tempData
if(key=="three"){
    updated()
}


}

for (country in catObjects){
   getData(country);
    
}

function updated(){
   for(country in catObjects){

    document.getElementById(country).innerText=catObjects[country]["region"]["value"]
    document.getElementById(country).addEventListener("click",()=>{
        //disappear hand and sleeves and cards
        //turn into function on/off

        document.getElementById('sleeve').style.visibility="hidden"
        document.getElementById('hand').style.visibility="hidden"
        let cards = document.getElementsByClassName("container")
        cards=[...cards]
        cards.forEach(card=>card.style.visibility="hidden")
        prep(country)
    })
}
}
function prep(country){
    let q =catObjects[country]["name"]
    let questionGrid= document.getElementById("question").innerText="What is the capital of " + q
    let userBox = document.getElementById("userBox")
    // //make div, set content to what's the capital of name
    let a = catObjects[country]["capitalCity"]
    a= a.trim()
    let lineNo = a.length;
    for(let i=0;i<lineNo;i++){
       let line= document.createElement("div")
       line.className="line"
       line.innerText=""
       line.id=`${i}`

       userBox.appendChild(line)
    

    }
    // //make alphabet grid
    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    // //add alpahbets
    let alphaGrid=document.getElementById("alphaGrid")
   
    let userInput =[];
    alphabet.forEach(char=>{
        let letter=document.createElement('div')
        letter.className = 'letter'
        letter.innerText=char
       letter.addEventListener("click",()=>{
            let letterCopy= char
        userInput.push(letterCopy)
        checkLet(char, a,userInput)

       })
       alphaGrid.appendChild(letter)
    })

    }

    let mistakes=0;
    function checkLet(letter,a,userInput){
        if(userInput.length==1){
            letter = letter.toUpperCase();
        }
        
        if (a.includes(letter)){
            
             let lineId= a.indexOf(letter)
             let answerLength= a.length
             if(answerLength-1==lineId){
                win()
             }else{
                let targetBox= document.getElementById(`${lineId}`)
                targetBox.innerText=letter
             }
              
    
           
    
        }else{
            if(mistakes==3){
                //block board
                alert("you've lost")
            }else{
                mistakes++;
                addBombs(mistakes)

            }
            
        }
        //add to line
    }
    function win(){
        //block  and show modal
        alert("win")  

    }
    function addBombs(mistakes){
        let bombBox = document.getElementById("bomb");
        if(mistakes==1){
            bombBox.innerHTML="<img class='bombPic' src='https://cdn-icons-png.flaticon.com/512/3002/3002390.png'/>"

        }else if(mistakes==2){
            bombBox.innerHTML="<img class='bombPic' src='https://cdn-icons-png.flaticon.com/512/236/236505.png'>"

        }
        else if (mistakes==3){
            bombBox.innerHTML="<img class='bombPic' src='https://cdn-icons-png.flaticon.com/512/1086/1086944.png'>"

        }
    }