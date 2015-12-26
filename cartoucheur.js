function toggle(player) {
	player = document.getElementById(player);
	player.currentTime = 0;
	player.parentElement.style.backgroundColor = 'green';
	player.play();
	
}

players = document.getElementsByTagName('audio');
for(var i = 0; i < players.length; i++){
	players[i].onended = function() {
		this.parentElement.style.backgroundColor = 'red';
	}
}


function stopAll(){
	players = document.getElementsByTagName('audio')
	for( var i = 0; i < players.length; i++){
		players[i].pause();
		players[i].currentTime = 0;
		players[i].parentElement.style.backgroundColor = 'red';
	}
}

