/* Simple Flash Card Maker using Local Storage

Author: Vijay Menon
Github: @vijayxtreme
Twitter: @vijayxtreme
Description: 
	Make your own flash cards using this custom flashcard maker.
	Make as many you want, useful for studying!
Version: 1.0

*/

var i = 0;
var cards = [];
//var flashCards = [];
if (localStorage['cards'] != undefined){
	cards = JSON.parse(localStorage['cards']); //array of objs
	//console.log(cards);
	// for(var i=0; i<cards.length; i++){
	// 	flashCards.push(cards[i]['card']);
	// }	
	// console.log(flashCards);
	
	
}else {
	//nothing saved to localStorage, output this later in the DOM
}

window.onload = function(){

	//Some arbitrary flashcards
	if(localStorage['cards'] != undefined){
		document.getElementById('heading').innerHTML = cards[i]['heading'];	
		document.getElementById('subheading').innerHTML= cards[i]['subText'];	
		document.getElementById('display-answer').style.display = "block";	
	}else {
		document.getElementById('heading').innerHTML = "No flashcards saved yet, why don't you create some?";
		document.getElementById('subheading').innerHTML = "";
	}
	
	//Handle Next & Prev Events
	document.getElementById('next').onclick = function(){
		
		if(cards.length !== 0){
			
			++i;
			if(i<cards.length){			
				document.getElementById('heading').innerHTML = cards[i]['heading'];	
				document.getElementById('subheading').innerHTML= cards[i]['subText'];

			}else{
				i=0;
				document.getElementById('heading').innerHTML = cards[i]['heading'];	
				document.getElementById('subheading').innerHTML= cards[i]['subText'];	
			}
			document.getElementById('subheading').style.display = "none";
		
		}
	};

	document.getElementById('prev').onclick = function(){
		
		if(cards.length !== 0){	
			if(i>0 && i<cards.length){
				--i;
				document.getElementById('heading').innerHTML = cards[i]['heading'];	
				document.getElementById('subheading').innerHTML= cards[i]['subText'];	
			}else{
				i=cards.length; 
				--i; 
				document.getElementById('heading').innerHTML = cards[i]['heading'];	
				document.getElementById('subheading').innerHTML= cards[i]['subText'];		
			}
			document.getElementById('subheading').style.display = "none";
		}
	};

	//Clear Flashcards
	document.getElementById('clear-flashcards').onclick = function(){
		var answer = confirm("Are you sure you want to clear the flashcards?");
		if(answer){
			localStorage.removeItem('cards');
			location.reload();
		}
	};

	//Display Answer
	document.getElementById('display-answer').onclick = function(){
		var subheading = document.getElementById('subheading');

		subheading.style.display = (subheading.style.display == '' || subheading.style.display == 'none') ? 'block' : 'none';
		
	};

	//Download Text
	document.getElementById('dl').onclick = function(){
		var data = new Blob([JSON.stringify(cards)], {type: 'text/plain'});
		var text = window.URL.createObjectURL(data);
		document.getElementById('dl').href = text;

	};

	//Upload
	document.getElementById('upload-text').addEventListener('change', readSingleFile, false);




};



function saveForm(){
	var headingText = document.getElementById('heading-text').value;
	var subText = document.getElementById('sub-heading-text').value;
	if((headingText == undefined || headingText =="") || (subText== undefined || subText =="")){
		alert("Please enter value for the flashcard and flashcard answer");
	}else{
		var obj = {
			'heading':headingText,
			'subText': subText
		};

		cards.push(obj);
		
		if(localStorage) {
			localStorage['cards'] = JSON.stringify(cards);
			alert(val + " was saved");
			location.reload();
		}else{
			alert(val + " was not saved");		
		}
	}
	return false;	
}
function readSingleFile(evt){
	//Upload Text File

	var res = confirm("This will overwrite the current flashcard database. Okay?");
	
	if(res){
		var f = evt.target.files[0];

		if(f){
			 var r = new FileReader();
		     r.onload = function(e) { 
			      var contents = e.target.result; 	
			      localStorage['cards'] = contents;
				  location.reload();

		     }
			r.readAsText(f);

		}
	}

}




