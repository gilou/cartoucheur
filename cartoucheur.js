

var players = [
		{ id: "jingle1", source: "jingle1.wav", type: "audio/wav" },
		{ id: "jingle2", source: "jingle2.wav", type: "audio/wav" },
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

/*
 * Create the <div><audio><source /></audio></div>
 * structure
 */
function createAudioDiv(id, source, type) {
	player = document.createElement("audio");
	player.id = id
	s = document.createElement("source");
	s.src = source;
	s.type = type;
	player.appendChild(s);
	player.preload = true;
	container = document.createElement("div");
	container.className = "cartouche";
	container.appendChild(player);
	etiquette = document.createElement("p");
	etiquette.id = "label" + id;
	etiquette.innerHTML = source;
	container.appendChild(etiquette);

	container.onclick = function() {
		play(this)
	}
	player.onended = function() {
		endedCallback(this)
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
