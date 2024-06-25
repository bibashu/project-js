// 1- Quection1c
console.log("--------------------Question 1-------------");
console.log(" ");
function testChaine1(chaine2){
    var tab = chaine2.split("")
   if(tab[0].includes("A") ||tab[0].includes("B") ){
    console.log("le string commence par une majuscule");
   
   }else if(tab[0].includes("a") ||tab[0].includes("b")){
    console.log("le string commence par une minuscule");
    
   }
   
    }
testChaine1("Aoto")

 
console.log("--------------Question 2--------");

// 2- Quection2
function testChaine(chaine1){
    var tab = chaine1.split("")
   if(tab.includes("@")){
    console.log(true);
    return true
   }else{
    console.log(false);
    return false
   }
    

}
testChaine("t@to")
// Question3 ------------------
console.log("-------------Question 3----------- ");

function chaineNumber(){
    var chaineNombre = "185ppp"
    var chaineConversion = parseInt(chaineNombre)
    if(typeof(chaineConversion) === 'number'){
        console.log(true);
    }else{
     if(typeof(chaineNombre) === 'string'){
        console.log(false);
    }
}
   
}
chaineNumber()
console.log(" ");



console.log(" ------------Question 4----------------");
console.log(" ");
// 4- question4

    var tabNumbre = [1, 4, 5, 18]
 
    function replacerCaractére(){
           var tabRemplacer =  tabNumbre.map(element => (element) =  typeof(Number) ? "*" : element);
           console.log(tabRemplacer);
    }
    
    replacerCaractére()









