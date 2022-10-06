   let GameState ="round-1"
   let allEnteredLetter = []
   let score =0;
   let catObjects = {one:0  , two: 0 , three:0}
   let ctnBtn = document.getElementById("ctnBtn")

 
   function configState(){
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
    let values =Object.values(catObjects)
    let truth =values.every(value=>value!="0")
    if(truth==true){
        updated()
    }


}
function getCard(){

for (country in catObjects){
   getData(country);
    
}
}

function updated(){
    console.log(catObjects)
let card1 = document.getElementById("one");
let card2 = document.getElementById("two");
let card3 = document.getElementById("three");

card1.innerText=catObjects["one"]["region"]["value"]
card2.innerText=catObjects["two"]["region"]["value"]
card3.innerText=catObjects["three"]["region"]["value"]
card1.addEventListener("click",()=>{
    GameState="question"
    configState()
    prep("one")
    allEnteredLetter=[]
    
})
card2.addEventListener("click",()=>{
    GameState="question"
    configState()
    prep("two")
    allEnteredLetter=[]

    
})
card3.addEventListener("click",()=>{
    GameState="question"
    configState()
    prep("three")
    allEnteredLetter=[]

    
})

}
function prep(country){
    let q =catObjects[country]["name"]
    let questionGrid= document.getElementById("question").innerText="What is the capital of " + q
    let userBox = document.getElementById("userBox")
    // //make div, set content to what's the capital of name
    let a = catObjects[country]["capitalCity"]
    a= a.split(" ").filter(l=>l!="'" && l!="-").join('')
    let lineNo = a.length;
    userBox.innerHTML=""
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
    alphaGrid.innerHTML=""
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
       
        let aCopy= a.toLowerCase()
        aCopy=[...aCopy]
        aCopy = aCopy.filter(c=>c!="'" && c!="-")
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
        let sound2= document.getElementById("win")
            sound2.play()
        score= score+5
        GameState="round-2"
        document.getElementById('score-text').innerText=score
       
        //block  and show modal
        ctnBtn.style.visibility="visible"
        $("#myModal").modal('show');
        $(".modal-header").text("Score!")
        $(".modal-body").text("You've answered correctly\n answer another and earn more points?")

        
    }

    
    function addBombs(mistakes){
        let bombBox = document.getElementById("bomb");
        if(mistakes==1){
            let sound= document.getElementById("loss")
            sound.play()
            bombBox.innerHTML="bomb</br><img class='bombPic' src='pictures/bomb1.gif'/>"

        }else if(mistakes==2){
            sound.play()
            bombBox.innerHTML="bomb</br><img class='bombPic' src='pictures/bomb2.gif'>"

        }
        else if (mistakes==3){
            //block  and show modal
            ctnBtn.style.visibility="visible"
            sound.play()
            $("#myModal").modal('show');
            $(".modal-header").text("Oh no!")
            $(".modal-body").text("You've run out of tries\n play again?")
            bombBox.innerHTML="bomb</br><img class='bombPic' src='pictures/bomb3.gif'>"

        }
    }
    //first set up
if(GameState=="round-1"){
        configState()
}
