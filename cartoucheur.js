var players = [
		{ id: "jingle1", source: "jingle1.wav", type: "audio/wav" },
		{ id: "jingle2", source: "jingle2.wav", type: "audio/wav" },
		{ id: "jingle3", source: "jingle3.mp3", type: "audio/mpeg" },
		{ id: "jingle4", source: "jingle4.mp3", type: "audio/mpeg" },
		{ id: "jingle2c", source: "jingle2.wav", type: "audio/wav" },
		{ id: "jingle2d", source: "jingle2.wav", type: "audio/wav" },
		{ id: "jingle2e", source: "jingle2.wav", type: "audio/wav" },
		{ id: "jingle2f", source: "jingle2.wav", type: "audio/wav" },
	]

var nbPlayers = players.length
var cartoucheur = document.getElementById('cartoucheur')
var bouton_stop = document.getElementById('stop')

/**
 * What to do when audio file ends
 */
function endedCallback(element){
	element.parentElement.style.backgroundColor = 'red';
}

function displayBouton(player){
	etiquette = document.getElementById('label' + player.id);
	etiquette.innerHTML = player.id +  "<br />"
	etiquette.innerHTML += Math.round(player.currentTime*100)/100
													+ " / "
													+ Math.round(player.duration*100)/100;
}

/*
 * Create the <div><audio><source /></audio></div>
 * structure
 */
function createAudioDiv(id, source, type) {
	var container, player, s, etiquette
	player = new Audio();
	player.id = id
	player.src = source;
	player.preload = "auto";
	container = document.createElement("div");
	container.className = "cartouche";
	container.appendChild(player);
	etiquette = document.createElement("p");
	etiquette.id = "label" + id;
	etiquette.innerHTML = source;
	container.appendChild(etiquette);


	player.onended = function() {
		endedCallback(this);
	}
	player.ondurationchange = function(){
		displayBouton(this);
	}

	player.ontimeupdate = function(){
				displayBouton(this);
	}
	container.onclick = function() {
		play(this);
	}
	return container;

}

for(var i = 0; i < nbPlayers; i++){
	container = createAudioDiv(players[i].id,
											players[i].source,
											players[i].type);

	cartoucheur.insertBefore(container, bouton_stop);
}

function play(container) {
	// normalement, on a <div><audio>
	player = container.childNodes[0];
	player.currentTime = 0;
	player.parentElement.style.backgroundColor = 'green';
	player.play();

}

function stopAll(){

	var players = document.getElementsByTagName('audio');
	playersLength = players.length;
	for( var i = 0; i < playersLength; i++){
		players[i].pause();
		players[i].currentTime = 0;
		endedCallback(players[i]);
	}
}
