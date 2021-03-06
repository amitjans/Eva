var socket = io.connect('158.97.91.58:8080', { 'forceNew': true });

socket.on('messages', function(data) {  
    console.log(data);
});

function iniciarEmocion(tipo){
	console.log('iniciarPensar');
	socket.emit('new-message',tipo);
}

$(document).ready(function(){
	$("#btnNormal").on("tap",function(){
		socket.emit('new-message',{tipo:1});
	});
	$("#btnPensar").on("tap",function(){
		socket.emit('new-message',{tipo:2});
	});
	$("#btnTriste").on("tap",function(){
		socket.emit('new-message',{tipo:3});
	});
	$("#btnAmor").on("tap",function(){
		socket.emit('new-message',{tipo:4});
	});
	$("#btnEngagement").on("tap",function(){
		socket.emit('new-message',{tipo:5});
	});
	$("#btnFeliz").on("tap",function(){
		socket.emit('new-message',{tipo:6});
	});
	$("#btnMiedo").on("tap",function(){
		socket.emit('new-message',{tipo:7});
	});
	$("#btnEnviar").on("tap",function(){
		socket.emit('new-message',{accion:1, mensajePersonalizado:$("#txtMensaje").val()});
		$("#txtMensaje").val('');
	});
	$('#txtMensaje').on('keydown',function(e){
		if(e.which == 13){
			socket.emit('new-message',{accion:1, mensajePersonalizado:$("#txtMensaje").val()});
			$("#txtMensaje").val('');
		}
	});
	$("#btnSaludo").on("tap",function(){
		socket.emit('new-message',{accion:2, mensaje:'Eva saluda'});
	});
	$("#btnRefranes").on("tap",function(){
		socket.emit('new-message',{accion:3, mensaje:'Eva quiero jugar a los refranes'});
	});
	$("#btnChiste").on("tap",function(){
		socket.emit('new-message',{accion:4, mensaje:'Eva cuentame un chiste'});
	});
});
