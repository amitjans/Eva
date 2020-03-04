var personalidades = [
    {tipo:8, voz:'es-LA_SofiaVoice', nombre:'Eva', movimiento:'2',color:'5', saludo:'¡Qué tal! Mi nombre es Eva. Vamos a jugar',despedida:'Adiós', piensa:'Piénsalo por 10 segundos'},
    {tipo:9, voz:'es-ES_LauraV3Voice', nombre:'Maruja', movimiento:'P',color:'6', saludo:'Hola. Yo soy Maruja. Vamos a por el juego',despedida:'Hasta la vista', piensa:'Tienes 10 segundos para decidir'},
    {tipo:10, voz:'es-US_SofiaV3Voice', nombre:'Sofía', movimiento:'3',color:'7', saludo:'¡Qué onda! Yo soy Sofía. Es tiempo de jugar',despedida:'Nos vemos luego', piensa:'Tómate 10 segundos para pensarlo'},
    {tipo:11, voz:'es-ES_EnriqueV3Voice', nombre:'Enrique', movimiento:'P',color:'8', saludo:'Buenos días. Mi nombre es Enrique. Ahora vamos a jugar',despedida:'Hasta pronto', piensa:'Piensa por 10 segundos y decide'},
    {tipo:12, voz:'es-ES_LauraV3Voice', nombre:'Pilar', movimiento:'4',color:'9', saludo:'Hola, hola. Yo me llamo Pilar. ¿Listo para jugar?',despedida:'Hasta luego', piensa:'Tienes 10 segundos para pensarlo'},
    {tipo:13, voz:'es-ES_EnriqueV3Voice', nombre:'Iñaki', movimiento:'3',color:'A', saludo:'Saludos, yo soy Iñaki. A darle al juego.',despedida:'Nos estamos viendo', piensa:'Piensa 10 segundos para tomar una decisión'},
    {tipo:14, voz:'es-LA_SofiaV3Voice', nombre:'Nansy', movimiento:'P',color:'B', saludo:'Gusto en conocerte, Yo soy Nansy. Es hora de jugar',despedida:'Fu un placer conocerte. Adiós', piensa:'Piensa mi oferta por 10 segundos'},
    {tipo:15, voz:'es-ES_LauraV3Voice', nombre:'Laura', movimiento:'4',color:'C', saludo:'Mi nombre es Laura. Vamos a jugar un rato',despedida:'Nos vemos pronto', piensa:'Tienes 10 segundos para pensarlo'}
  ];

  module.exports = {
    getPersonalidades: function () {
        return personalidades;
    },
    getEva: function () {
        return personalidades[2];
    }
  };