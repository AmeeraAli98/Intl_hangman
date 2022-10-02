   let index1,index2,index3="";
   $(document).ready(function(){
            $("#myModal").modal('show');
    });
// function getRandomIndex(){
//     return Math.floor(Math.random()*50)
// }

//     function getCat(){
//         index1=getRandomIndex()
//         index2=getRandomIndex()
//         index3=getRandomIndex()

        
//             return fetch(`http://api.worldbank.org/v2/country/?format=json`)
//              .then((response) => response.json())
//              .then((json) => {
//              index1= json[1][index1]
//              if(index1["region"]["value"]=="Aggregates"){
//                 index1=getRandomIndex()
//                 document.getElementById("test").innerText =index1["region"]["value"]

//              }else{
//                 document.getElementById("test").innerText =index1["region"]["value"]


//              }

             

//              })
//              .catch((error) => {
//                console.error(error);
//              });
         
//          }
