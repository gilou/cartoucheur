var players = [
		{ source: "jingle1.wav", type: "audio/wav" },
		{ source: "jingle2.wav", type: "audio/wav" },
		{ source: "jingle3.mp3", type: "audio/mpeg" },
		{ source: "jingle4.mp3", type: "audio/mpeg" },
	]

/*
 * Fill it with useless pads
for(var i = 5; i < 13; i++){
	players.push({ id: "jingle" + i, source: "jingle4.mp3", type: "audio/mpeg"});
}
*/
var nbPlayers = players.length
var cartoucheur = document.getElementById('cartoucheur')
var bouton_stop = document.getElementById('stop')
var timers = {}

/**
 * What to do when audio file ends
 */
function endedCallback(element){
	button = document.getElementById('button' + element.id);
	button.style.backgroundColor = 'rgb(220,0,0)';
	displayBouton(element);
}

function displayBouton(player){
	etiquette = document.getElementById('button' + player.id);
	etiquette.innerHTML = player.id +  "<br />"
	etiquette.innerHTML += Math.round(player.currentTime*100)/100
						+ " / "
						+ Math.round(player.duration*100)/100;
}

/*
 * Create the <div><audio><source /></audio></div>
 * structure
 */
function createAudioButton(id, source, type, rootElement) {
	var container, player, s, etiquette
	player = new Audio();
	player.id = id
	player.src = source;
	player.preload = "auto";
	container = document.createElement("button");
	container.id = 'button' + id
	container.className = "cartouche";
	container.innerHTML = source;
	rootElement.appendChild(player);


	player.onended = function() {
		endedCallback(this);
	}
	player.ondurationchange = function(){
		displayBouton(this);
	}

	container.onclick = function() {
		toggle(this);
	}
	return container;

}

function onFile(evt){
	file = evt.target.files[0];
	url = URL.createObjectURL(file);
	player = document.getElementById('player' + evt.target.id.substr(4));
	if(player.canPlayType(file.type)){
		console.log('can play' + file.name);
		player.src = url;
	}
	else {
		console.log('fuck ' + file.name);
	}
}
for(var i = 0; i < nbPlayers; i++){
	container = createAudioButton('player' + i,
					players[i].source,
					players[i].type,
					cartoucheur
				     );

	cartoucheur.insertBefore(container, bouton_stop);
	file = document.createElement("input");
	file.type = 'file';
	file.id = 'file' + i;
	file.addEventListener('change', onFile, false);
	cartoucheur.insertBefore(file, bouton_stop);

}
/*
 * Plays or stop the jingle cart
 */
function toggle(container){
	player = document.getElementById(container.id.substr(6));
	if(player.currentTime == 0 || player.paused){
		container.style.backgroundColor = 'green';
		play(player);
	} else {
		stop(player);
	}

}
function stop(player){
	player.pause();
	player.currentTime = 0;
	endedCallback(player);
	if (timers[player.id] != undefined) {
		window.clearInterval(timers[player.id])
	}
}
function play(player) {
	player.currentTime = 0;
	timers[player.id] = setInterval(displayBouton, 50, player);
	player.play();

}

function stopAll(){

	var players = document.getElementsByTagName('audio');
	playersLength = players.length;
	for( var i = 0; i < playersLength; i++){
		stop(players[i]);
	}
}
