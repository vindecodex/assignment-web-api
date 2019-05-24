(function(){


const xhr = new XMLHttpRequest();
const url = "https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&search=";
const word= document.querySelector("#word");
const resultContainer = document.querySelector("#resultContainer")

word.onkeypress = function search(e){
	if(e.keyCode == 13 && word.value != ""){
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4 && xhr.status === 200){
				deleteElem();
				console.log(xhr.responseText);
				let obj = JSON.parse(xhr.responseText);
				let length = obj[1].length;
				if(length){
					for(let i = 0; i < length; i++){
						createElem(obj[1][i], obj[2][i], obj[3][i]);
					}
				}else{
					notFound();
				}
			}
		}

		xhr.open("GET",url + word.value, true);
		xhr.send();
	}
}

function createElem(data1,data2,data3){
	let box = document.createElement("div");
	let name = document.createElement("h3");
	let definition = document.createElement("p");
	let link = document.createElement("a");

	box.setAttribute("class","box");
	link.setAttribute("href", data3);


	box.appendChild(name);
	box.appendChild(definition);
	box.appendChild(link);

	name.innerHTML = data1;
	definition.innerHTML = data2;
	link.innerHTML = data3;

	resultContainer.appendChild(box);
}

function notFound(){
	let notFound = document.createElement("h2");
	notFound.setAttribute("class", "notFound");
	notFound.innerHTML = "No Results Found about " + word.value;
	resultContainer.appendChild(notFound);
}

function deleteElem(){
	resultContainer.innerHTML = '';
}



})()