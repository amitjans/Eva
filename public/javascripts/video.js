
//var socket = io.connect('158.97.91.58:8080', { 'forceNew': true });
var socket = io.connect('192.168.1.68:8080', { 'forceNew': true });
var player, iframe;

socket.on('messages', function(data) { 
	console.log(data);
	if(data.youtube_video){
		if($('#player'))
			$('#player').remove();
		var playerDOM = "<div id=\"player\"></div>";
		$("body").append(playerDOM);
		$('#player').attr('width', $(window).width());
		$('#player').attr('height', $(window).height());
		player = new YT.Player('player', {
			height: $(window).height(),
			width: $(window).width(),
			videoId: data.youtube_video.id,
			events: {
			  'onReady': playFullscreen 
			}
		  });
	}
	else
		if($('#player'))
			if(data.accionVideo=='pause.video'){
				player.pauseVideo();
			}
			else if(data.accionVideo=='play.video')
					player.playVideo();
});

var playFullscreen = function(){
	iframe = $('#player');
	player.playVideo();//won't work on mobile
  
  var requestFullScreen = iframe.requestFullScreen || iframe.mozRequestFullScreen || iframe.webkitRequestFullScreen;
  if (requestFullScreen) {
    requestFullScreen.bind(iframe)();
  }
}
