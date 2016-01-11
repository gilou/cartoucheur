players = [ ];
/* Pour les tests : */
for(var iinit = 0; iinit < 16 ; iinit++){
	players.push( { source: "", loop: false});
}
/*
 * Fill it with useless pads
for(var i = 5; i < 13; i++){
	players.push({ id: "jingle" + i, source: "", type: "audio/mpeg"});
}
*/
var nbPlayers = players.length
var cartoucheur = document.getElementById('cartoucheur')
var bouton_stop = document.getElementById('stop')
var chargeur = document.getElementById('chargeur')
var timers = {}

/**
 * What to do when audio file ends
 */
function endedCallback(element, stopped){
	id = element.id.substr(6);
	if(players[id].loop && stopped == undefined) {
		player.currentTime = 0;
		player.play()
	}
	else {
		button = document.getElementById('button' + element.id);
		button.style.backgroundColor = 'rgb(220,0,0)';
	}
		displayBouton(element);
}

function displayBouton(player, texte){
	if (texte == undefined){
		joli_id = 1 + parseInt(player.id.substr(6));
		texte = '[' + joli_id + ']  ' +players[player.id.substr(6)].source;
	}
	
	etiquette = document.getElementById('button' + player.id);
	etiquette.innerHTML = texte +  "<br />"
	etiquette.innerHTML += Math.round(player.currentTime*100)/100
						+ " / "
						+ Math.round(player.duration*100)/100;
}

/*
 * Create the <div><audio><source /></audio></div>
 * structure
 */
function createAudioButton(id, source, rootElement) {
	var container, player, s, etiquette
	player = new Audio();
	player.id = id
	joli_id = 1 + parseInt(id.substr(6));
	player.preload = "auto";
	container = document.createElement("button");
	container.id = 'button' + id
	container.className = "cartouche";
	container.innerHTML = '[' + joli_id + ']' + source
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
	id = evt.target.id.substr(4);
	player = document.getElementById('player' + id);
	if(player.canPlayType(file.type)){
		player.src = url;
		players[id].source = file.name;
	}
	else {
		console.log('fuck ' + file.name);
	}
}

function onLoop(evt){
	id = evt.target.id.substr(8);
	console.log(evt.target.checked);
	players[id].loop = evt.target.checked;
}
for(var i = 0; i < nbPlayers; i++){
	container = createAudioButton('player' + i,
					players[i].source,
					cartoucheur
				     );

	cartoucheur.insertBefore(container, bouton_stop);
	
	label = document.createElement('label');
	label.for = 'file' + i;
	label.innerHTML = i+1;

	loopcheck = document.createElement("input");
	loopcheck.type = 'checkbox';
	loopcheck.id = 'checkbox' + i;
	loopcheck.addEventListener('click', onLoop, false);

	file = document.createElement("input");
	file.type = 'file';
	file.id = 'file' + i;
	file.addEventListener('change', onFile, false);
	file.accept = 'audio/*'

	load_div = document.createElement('div')
	load_div.className = 'chargeur'
	load_div.appendChild(label);
	load_div.appendChild(loopcheck);
	load_div.appendChild(file);
	chargeur.appendChild(load_div);

}
/*
 * Plays or stop the jingle cart
 */
function toggle(container){
	player = document.getElementById(container.id.substr(6));
	if(player.src == '' || player.src == undefined){
		fe = document.getElementById('file' + player.id.substr(6));
		console.log('fouk file' +  fe);
		fe.click();
		return false;
	}
	if(player.currentTime == 0 || player.paused ){
		container.style.backgroundColor = 'green';
		play(player);
	} else {
		stop(player);
	}

}
function stop(player){
	player.pause();
	player.currentTime = 0;
	endedCallback(player, true);
	if (timers[player.id] != undefined) {
		window.clearInterval(timers[player.id])
	}
}
function play(player) {
	player.currentTime = 0;
	timers[player.id] = setInterval(displayBouton, 50, player);
	player.load();
	player.play();

}

function stopAll(){

	var stopplayers = document.getElementsByTagName('audio');
	playersLength = stopplayers.length;
	for( var i = 0; i < playersLength; i++){
		if(stopplayers[i].src != ''){
			stop(stopplayers[i]);
		}
	}
}

function handleKeys(evt){
	/* Touches 1 à 9 reliées au player 0 à 8 */
	if(evt.keyCode > 48 && evt.keyCode <= 57) {
		evt.preventDefault();
		id = evt.keyCode-49;
		player = document.getElementById('buttonplayer' + id);
		player.click();
	}

	if(evt.keyCode > 96 && evt.keyCode <= 105) {
		evt.preventDefault();
		id = evt.keyCode-97;
		player = document.getElementById('buttonplayer' + id);
		player.click();
	}
}

document.body.onkeydown = handleKeys;
