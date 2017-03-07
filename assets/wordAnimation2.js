
var header = $("header");
var footer = $("footer");
var section = $("section").text();
var congrats = "Congratulations!";
var congratsArray = congrats.split("");

console.log(section);

var j = 0
for(var i =0;  i < section.length; i++){
	if(section[i] === congratsArray[j]){
		j++;
		header.append(section[i]);
	}
	else{
		section[i] = section[i].toLowerCase();
		footer.append(<div> <div class="letter">section[i]</div> <div class-"number"></div> </div>);
	}

}