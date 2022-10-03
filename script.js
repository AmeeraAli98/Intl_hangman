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
}
}