var secondsRemaining;
var intervalHandle;
var pauseButton;
var resetButton;
var timeDisplay;

function resetPage() {
    document.getElementById('inputArea').style.display = "block";
    document.getElementById('time').style.color = "black";
	if(secondsRemaining!==0){
		secondsRemaining = 0;
		clearInterval(intervalHandle);
		document.getElementById('main').removeChild(pauseButton);
		document.getElementById('main').removeChild(resetButton);
		document.getElementById("time").innerHTML = "0:00";
		
	}
}
function pauseCountdown(event){
	clearInterval(intervalHandle);
	pauseButton.setAttribute("value","Resume");
	pauseButton.disabled = true;
}
function tick () {
	//grab the h1
	var timeDisplay = document.getElementById("time");

	//turn seconds into mm:ss
	var min = Math.floor(secondsRemaining/60);
	var sec = secondsRemaining - (min * 60);

	// add a leadin zero (as a string value ) if second is less than 10
	 if(sec < 10){
	 	sec = "0" + sec;
	 }

	// concatinate with colon
	var message = min + ":" + sec;
	//now change the display;
	timeDisplay.innerHTML = message;
	// stop if down to zero
	 if(secondsRemaining ===0){
	 	alert("Done");
	 	clearInterval(intervalHandle);
	 	resetPage();
	 }
     if(secondsRemaining===11){
         timeDisplay.style.color = "red";
     }
	secondsRemaining--;
}

function startCountdown () {
	
	//get content of "minutes" textbox
	var minutes = document.getElementById('minutes').value;
	// check if number
	if(isNaN(minutes)){
		alert("Please enter a number"+minutes.innerHTML);
		return;
	} else if (minutes > 12) {
		alert("Maximum number is 12");
		return;
	} else if (minutes < 1){
		alert("Minimum number is 1");
		return;
	}
	// how many seconds
	secondsRemaining = minutes * 60;
	// every second, call tick function
	intervalHandle = setInterval(tick, 1000);
	// the form
	document.getElementById('inputArea').style.display = "none";
	
	//create pause button
	pauseButton = document.createElement('input');
	pauseButton.setAttribute("type","button");
	pauseButton.setAttribute("value","Pause");
	pauseButton.onclick = function () {
		pauseCountdown();
	};
	
	//create reset button
	resetButton = document.createElement('input');
	resetButton.setAttribute("type","button");
	resetButton.setAttribute("value","Reset");
	resetButton.onclick=function(){
		resetPage();
	}
	document.getElementById("main").appendChild(pauseButton);
	document.getElementById("main").appendChild(resetButton);
}

window.onload = function  () {
	//create input field and give it id of "minutes"
	var inputMinutes = document.createElement("input");
	inputMinutes.setAttribute("type","text");
	inputMinutes.setAttribute("id","minutes");
	//create a button
	var startButton = document.createElement("input");
	startButton.setAttribute("type","button");
	startButton.setAttribute("value","Start Countdown");
	startButton.onclick = function  () {
		startCountdown();
	};
	
	

	document.getElementById('inputArea').appendChild(inputMinutes);
	document.getElementById('inputArea').appendChild(startButton);
}