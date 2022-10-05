   let GameState ="round-1"
   let allEnteredLetter = []
   let score =0;
   let isAlpha = false
   let catObjects = {one:0  , two: 0 , three:0}


   function configState(){
    console.log(GameState)
    if (GameState=="round-1"){
        //hide board
        $(document).ready(function(){
            $("#myModal").modal('show');
            $(".modal-body").text("In this game, you'll be quizzed in general geographyTo start, pick a question category from the cards")
    });
        document.getElementById("gameBox").style.visibility="hidden"
        document.getElementById('side-box').style.visibility="hidden"

        getCard();

   }else if(GameState=="question"){
    
    document.getElementById('side-box').style.visibility="visible"
    document.getElementById('score-text').innerText=score
    document.getElementById('sleeve').style.visibility="hidden"
    document.getElementById('hand').style.visibility="hidden"
    let cards = document.getElementsByClassName("container")
    cards=[...cards]
    cards.forEach(card=>card.style.visibility="hidden")
    document.getElementById("gameBox").style.visibility="visible"

   }
   else if(GameState=="round-2"){
    $("#myModal").modal("hide")
    //show card and hands and sleeves
    document.getElementById('sleeve').style.visibility="visible"
    document.getElementById('hand').style.visibility="visible"
    let cards = document.getElementsByClassName("container")
    cards=[...cards]
    cards.forEach(card=>card.style.visibility="visible")
    document.getElementById("gameBox").style.visibility="hidden"
    getCard()
   }
   }
  
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
console.log(catObjects)
if(key=="three"){
    updated()
}


}
function getCard(){

for (country in catObjects){
   getData(country);
    
}
}
function updated(){
   for(country in catObjects){
    let countrycard = document.getElementById(country)
   countrycard.innerText=catObjects[country]["name"]
    countrycard.addEventListener("click",()=>{
        //game state
        GameState="question"
        prep(country)
        configState()
    })
}
}
function prep(country){
    
    let q =catObjects[country]["name"]
    let questionGrid= document.getElementById("question").innerText="What is the capital of " + q
    let userBox = document.getElementById("userBox")
    // //make div, set content to what's the capital of name
    let a = catObjects[country]["capitalCity"]
    a= a.split(" ").join('')
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
    if(isAlpha==false){
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
    isAlpha=true
    }
    }

    let mistakes=0;
    function checkLet(letter,a,userInput){   
        let aCopy= a.toLowerCase();
        aCopy=[...aCopy]
        if (aCopy.includes(letter)){
                 let lineId =[]
             aCopy.forEach((ele, i)=>{
              if(ele==letter){
                  lineId.push(i)
                  allEnteredLetter.push(i)
              }
             })
             let answerLength = a.length
                console.log(allEnteredLetter)
             if(allEnteredLetter.length==answerLength){
                win()
                
             }else{
                lineId.forEach(index=>{
                    let targetBox= document.getElementById(`${index}`)
            targetBox.innerText=letter
                });
             }
            }else{
                    mistakes++;
                    addBombs(mistakes);
                   
                }
            }  
    
        
    function win(){
        score= score+5
        GameState="round-2"
        document.getElementById('score-text').innerText=score
        $(".modal-footer").append('<button type="button" onClick="configState()" >Continue</button>')
        //block  and show modal
        $("#myModal").modal('show');
        $(".modal-header").text("Score!")
        $(".modal-body").text("You've answered correctly\n answer another and earn more points?")

        
    }

    
    function addBombs(mistakes){
        let bombBox = document.getElementById("bomb");
        if(mistakes==1){
            bombBox.innerHTML="<img class='bombPic' src='pictures/bomb1.gif'/>"

        }else if(mistakes==2){
            bombBox.innerHTML="<img class='bombPic' src='https://cdn-icons-png.flaticon.com/512/236/236505.png'>"

        }
        else if (mistakes==3){
            $(".modal-footer").append('<button type="button" onClick="configState()" >Continue</button>')
            //block  and show modal
            $("#myModal").modal('show');
            $(".modal-header").text("Oh no!")
            $(".modal-body").text("You've run out of tries\n play again?")
            bombBox.innerHTML="<img class='bombPic' src='https://cdn-icons-png.flaticon.com/512/236/236505.png'>"

        }
    }
if(GameState=="round-1"){
        configState()
}
