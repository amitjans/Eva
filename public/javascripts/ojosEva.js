var scene, camera, renderer;
var image;

var WIDTH  = window.innerWidth;
var HEIGHT = window.innerHeight;

var SPEED = 0.1;

init();
animate();

function init(){
    stepParpado = 0.07;
    pasoPensar = 0.02;
    numPensar = 0;
    
	scene = new THREE.Scene();
	
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	camera = new THREE.PerspectiveCamera( 50, window.innerWidth/window.innerHeight, 0.1, 1000 );
	camera.position.set( 0, 0, 5 );
    scene.add( camera );

  //scene.add( new THREE.AmbientLight( 0xffffff) );
	//var light = new THREE.PointLight( 0xffffff, 0.5 );
	//camera.add( light );
    addLights();
    agregarOjos();
	agregarParpados();
    agregarCorazon();
    //cargarOjo();
    
    //tween.repeat(Infinity);

}

var iniciarParpadeo = false;
var iniciarPensando = false;
var iniciarTristeza = false;

//setTimeout(function(){ iniciarTristeza=true; }, 5000);
//setTimeout(function(){ normal(); }, 15000);

var ojoRight = null;
function animate() {
    
	requestAnimationFrame( animate );
    
    if (!ojoRight) {
        return;
    }
    /*if(iniciarParpadeo)
        parpadear();
    
    if(iniciarPensando){
        pensar();
    }
    if(iniciarTristeza){
        triste();
    }*/
    
    //ojoRight.scale.y +=0.0001;
    //ojoRight.scale.x = ojoRight.scale.y;
    //if(ojoRight.scale.z>1.5)
        //ojoRight.scale.z =0.99;
    TWEEN.update();
	render();

}

function render() {

	renderer.render( scene, camera );

}

function addLights(){
    var dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
    dirLight.position.set(100, 100, 50);
    scene.add(dirLight);
    var ambLight = new THREE.AmbientLight(0xa0a0a0);
    scene.add(ambLight);
}

var cierreOjos = Math.PI/2;
var aberturaOjos = Math.PI/4;

function parpadear(){

    parpadoTop.rotation.x += stepParpado;
    parpadoBottom.rotation.x -= stepParpado;
    parpadoTop2.rotation.x += stepParpado;
    parpadoBottom2.rotation.x -= stepParpado;
    
    if(parpadoTop.rotation.x > cierreOjos){
        stepParpado *= -1;
    }
    if(parpadoTop.rotation.x < aberturaOjos){
        stepParpado *= -1.0;
        iniciarParpadeo = false;
        setTimeout(function(){iniciarParpadeo = true},4000);
    }
}

function pensar(){
    var pasoVelocidad = 0.01;
    if(ojoLeft.rotation.x>-Math.PI/6 && numPensar == 0){ 
        ojoLeft.rotation.x -= pasoVelocidad;
        ojoLeft.rotation.y -= pasoVelocidad;
        ojoRight.rotation.x -= pasoVelocidad;
        ojoRight.rotation.y -= pasoVelocidad;
    }
    else{
        if(numPensar<5){
            ojoLeft.rotation.y += pasoPensar;
            ojoRight.rotation.y += pasoPensar;
            if(Math.abs(ojoLeft.rotation.y) >= Math.PI/6){
                pasoPensar *= -1.0;
                numPensar++;
                iniciarPensando = false;
                setTimeout(function(){ iniciarPensando = true }, 500);
            }   
        }
        else{
            if(ojoLeft.rotation.x<0){
                ojoLeft.rotation.x += pasoVelocidad;
                ojoLeft.rotation.y -= pasoVelocidad;
                ojoRight.rotation.x += pasoVelocidad;
                ojoRight.rotation.y -= pasoVelocidad;
            }
            else{
                ojoLeft.rotation.x = 0.0;
                ojoLeft.rotation.y = 0.0;
                numPensar=0;
                pasoPensar = 0.02;
                iniciarPensando = false;
                setTimeout(function(){ iniciarPensando = true }, 300);
            }
        }
             
    }
}


function triste(){
    iniciarParpadeo = false;
    scene.remove(parpadoBottom);
    scene.remove(parpadoBottom2);
    cierreOjos = Math.PI;
    aberturaOjos = Math.PI/1.7;
    
    parpadoTop.rotation.x += 0.01;
    ojoLeft.rotation.x += 0.006;
    parpadoTop2.rotation.x += 0.01;
    ojoRight.rotation.x += 0.006;
    if(parpadoTop.rotation.x >= (aberturaOjos)){
        ojoLeft.rotation.x = Math.PI/6;
        ojoRight.rotation.x = Math.PI/6;
        if(stepParpado>0)
            stepParpado*=-1;
        iniciarTristeza = false;
        iniciarParpadeo = true;
    }
}



function normal(){
    ojoLeft.rotation.set(0,0,0);
    ojoRight.rotation.set(0,0,0);
    aberturaOjos = Math.PI/4;
    cierreOjos = Math.PI/2;
    scene.add(parpadoBottom);
    scene.add(parpadoBottom2);
    parpadoTop.rotation.x = aberturaOjos;
    parpadoTop2.rotation.x = aberturaOjos;
    parpadoBottom.rotation.x = -aberturaOjos;
    parpadoBottom2.rotation.x = -aberturaOjos;
}



var animacionParpadeoAbajo, animacionParpadeoArriba;
var animacionParpadeoAbajo3, animacionParpadeoArriba3;
function tweenParpadeo(){
    
    var current = {x:aberturaOjos};
    var update	= function(){
		parpadoTop.rotation.x = current.x;
        parpadoTop2.rotation.x = current.x;
	}
      
    animacionParpadeoAbajo = new TWEEN.Tween(current)
                        .to({x:cierreOjos},500)
                        .delay(3000)
                        .easing(TWEEN.Easing.Quadratic.In)
                        .onUpdate(update);
    
    animacionParpadeoArriba = new TWEEN.Tween(current)
                        .to({x:aberturaOjos},500)
                        .delay(1)
                        .easing(TWEEN.Easing.Quadratic.Out)
                        .onUpdate(update);
    
    animacionParpadeoAbajo.chain(animacionParpadeoArriba);
    animacionParpadeoArriba.chain(animacionParpadeoAbajo);
    animacionParpadeoAbajo.start();
    
    if(!iniciarTristeza){
        var current3 = {x:-aberturaOjos};
        var update3	= function(){
            parpadoBottom.rotation.x = current3.x;
            parpadoBottom2.rotation.x = current3.x;
        }

        animacionParpadeoAbajo3 = new TWEEN.Tween(current3)
                            .to({x:-cierreOjos},500)
                            .delay(3000)
                            .easing(TWEEN.Easing.Quadratic.Out)
                            .onUpdate(update3);

        animacionParpadeoArriba3 = new TWEEN.Tween(current3)
                            .to({x:-aberturaOjos},500)
                            .delay(1)
                            .easing(TWEEN.Easing.Quadratic.Out)
                            .onUpdate(update3);

        animacionParpadeoAbajo3.chain(animacionParpadeoArriba3);
        animacionParpadeoArriba3.chain(animacionParpadeoAbajo3);
        animacionParpadeoAbajo3.start();    
    }
        
}


/*setTimeout(function(){
    tweenTristeza();
    },2000);*/

var animacionComplementaria, animacionComplementaria2, animacionOjos; 
function tweenTristeza(){
    iniciarTristeza = true;
    var current = {x: parpadoTop.rotation.x};
    var update = function(){
        parpadoTop.rotation.x = current.x;
        parpadoTop2.rotation.x = current.x;
    }
    //scene.remove(parpadoTop);
    //scene.remove(parpadoTop2); 
    cierreOjos=Math.PI;
    aberturaOjos = Math.PI/1.8;
    /*TWEEN.remove(animacionParpadeoAbajo);
    TWEEN.remove(animacionParpadeoArriba);
    TWEEN.remove(animacionParpadeoAbajo3);
    TWEEN.remove(animacionParpadeoArriba3);
    TWEEN.remove(animacionComplementaria);
    TWEEN.remove(animacionComplementaria2);
    TWEEN.remove(animacionOjos);*/
    TWEEN.removeAll();
    animacionComplementaria=new TWEEN.Tween(current)
                        .to({x:aberturaOjos},2500)
                        .delay(0)
                        .easing(TWEEN.Easing.Elastic.InOut)
                        .onUpdate(update)
                        .onComplete(function(){
                            TWEEN.remove(animacionComplementaria);
                            tweenParpadeo();
                        })
                        .start();
    animacionComplementaria2=new TWEEN.Tween(parpadoBottom.rotation)
                        .to({x:Math.PI/4.2},2500)
                        .delay(0)
                        .easing(TWEEN.Easing.Elastic.InOut)
                        .onUpdate(function(){parpadoBottom2.rotation.x=parpadoBottom.rotation.x;})
                        .onComplete(function(){
                            TWEEN.remove(animacionComplementaria2);
                            //tweenParpadeo();
                            console.log('onComplete');
                            //scene.remove(parpadoBottom);
                            //scene.remove(parpadoBottom2); 
                        })
                        .start();

    animacionOjos = new TWEEN.Tween(ojoLeft.rotation)
                        .to({x:Math.PI/6},2000)
                        .delay(0)
                        .easing(TWEEN.Easing.Elastic.InOut)
                        .onUpdate(function(){ojoRight.rotation.x=ojoLeft.rotation.x})
                        .start();
}



function tweenNormal(){

    var current = {x: parpadoTop.rotation.x};
    var update = function(){
        parpadoTop.rotation.x = current.x;
        parpadoTop2.rotation.x = current.x;
    }
    cierreOjos=Math.PI/2;
    aberturaOjos = Math.PI/4;
    /*TWEEN.remove(animacionParpadeoAbajo);
    TWEEN.remove(animacionParpadeoArriba);
    TWEEN.remove(animacionParpadeoAbajo3);
    TWEEN.remove(animacionParpadeoArriba3);
    TWEEN.remove(animacionComplementaria);
    TWEEN.remove(animacionComplementaria2);
    TWEEN.remove(animacionOjos);*/
    
    
    if(iniciarTristeza){
        iniciarTristeza=false;
        TWEEN.removeAll();
        animacionComplementaria=new TWEEN.Tween(current)
                        .to({x:aberturaOjos},2500)
                        .delay(0)
                        .easing(TWEEN.Easing.Elastic.InOut)
                        .onUpdate(update)
                        .onComplete(function(){
                            TWEEN.remove(animacionComplementaria);
                            tweenParpadeo();
                        })
                        .start();
        animacionComplementaria2=new TWEEN.Tween(parpadoBottom.rotation)
                            .to({x:-aberturaOjos},2500)
                            .delay(0)
                            .easing(TWEEN.Easing.Elastic.InOut)
                            .onUpdate(function(){parpadoBottom2.rotation.x=parpadoBottom.rotation.x;})
                            .onComplete(function(){
                                //TWEEN.remove(animacionComplementaria2);
                                //tweenParpadeo();
                                console.log('onComplete');
                                //scene.remove(parpadoBottom);
                                //scene.remove(parpadoBottom2); 
                            })
                            .start();
        animacionOjos = new TWEEN.Tween(ojoLeft.rotation)
                            .to({x:0},2000)
                            .delay(0)
                            .easing(TWEEN.Easing.Elastic.InOut)
                            .onUpdate(function(){ojoRight.rotation.x=ojoLeft.rotation.x})
                            .start();    
    }
    
    
    if(iniciarPensando){
        iniciarPensando = false;
        TWEEN.remove(aTop);
        TWEEN.remove(aRight);
        animacionOjos = new TWEEN.Tween(ojoLeft.rotation)
                        .to({x:0,y:0},2000)
                        .delay(0)
                        .easing(TWEEN.Easing.Elastic.InOut)
                        .onUpdate(function(){
                            ojoRight.rotation.x=ojoLeft.rotation.x;
                            ojoRight.rotation.y=ojoLeft.rotation.y;
                        })
                        .start();
    }
    if(iniciaAmor){
        iniciaAmor = false;
        TWEEN.removeAll();
        scene.remove(heartLeft);
        scene.remove(heartRight);
        TWEEN.remove(aTop);
        TWEEN.remove(aRight);
        tweenParpadeo();
    }
}

var aTop,aRight,aLeft,aBottom;
/*setTimeout(function(){
    tweenPensar();
    },4000);*/

function tweenPensar(){
    iniciarPensando=true;
    var value = Math.PI/6;
    TWEEN.remove(animacionComplementaria);
    TWEEN.remove(animacionComplementaria2);
    TWEEN.remove(animacionOjos);
    aTop = new TWEEN.Tween(ojoLeft.rotation)
                        .to({x:-value,y:-value},3000)
                        .delay(0)
                        .easing(TWEEN.Easing.Elastic.InOut)
                        .onUpdate(function(){
                            ojoRight.rotation.x=ojoLeft.rotation.x;
                            ojoRight.rotation.y=ojoLeft.rotation.y;
                        });
    aRight = new TWEEN.Tween(ojoLeft.rotation)
                        .to({y:value},3000)
                        .delay(1000)
                        .easing(TWEEN.Easing.Elastic.InOut)
                        .onUpdate(function(){
                            ojoRight.rotation.y=ojoLeft.rotation.y;
                        });
    aTop.chain(aRight);
    aRight.chain(aTop);
    aTop.start();
    
}

/*setTimeout(function(){
    tweenAmor();
    },4000);
setTimeout(function(){
    tweenNormal();
    },8000);*/
var iniciaAmor=false;

function tweenAmor(){
    iniciaAmor = true;
    scene.add(heartLeft);
    scene.add(heartRight);
    TWEEN.removeAll();
    aTop = new TWEEN.Tween(heartLeft.scale)
                        .to({x:0.12,y:0.12,z:0.12},1000)
                        .delay(0)
                        .easing(TWEEN.Easing.Elastic.In)
                        .onUpdate(function(){
                            heartRight.scale.x=heartLeft.scale.x;
                            heartRight.scale.y=heartLeft.scale.y;
                            heartRight.scale.y=heartLeft.scale.y;
                        });
    aRight = new TWEEN.Tween(heartLeft.scale)
                        .to({x:0.085,y:0.085,z:0.085},1000)
                        .delay(0)
                        .easing(TWEEN.Easing.Elastic.Out)
                        .onUpdate(function(){
                            heartRight.scale.x=heartLeft.scale.x;
                            heartRight.scale.y=heartLeft.scale.y;
                            heartRight.scale.y=heartLeft.scale.y;
                        });
    aTop.chain(aRight);
    aRight.chain(aTop);
    aTop.start();
    
}

var parpado = null;
var tamEye = 1.0;
function agregarParpados() {
    var loader = new THREE.JSONLoader();
    
    loader.load('/javascripts/parpado4.json', function(geometry, materials) {
        parpadoTop = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
        parpadoTop.scale.x = parpadoTop.scale.y = parpadoTop.scale.z = 1.01;
        parpadoTop.position.x = -0.75;
        parpadoTop.rotation.x = aberturaOjos;
        scene.add(parpadoTop);
        tweenParpadeo();
    });
    loader.load('/javascripts/parpado4.json', function(geometry, materials) {
        parpadoBottom = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
        parpadoBottom.scale.x = parpadoBottom.scale.y = parpadoBottom.scale.z = 1.01;
        parpadoBottom.position.x = -0.75;
        parpadoBottom.rotation.x = -aberturaOjos;
        scene.add(parpadoBottom);
    });
    loader.load('/javascripts/parpado4.json', function(geometry, materials) {
        parpadoTop2 = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
        parpadoTop2.scale.x = parpadoTop2.scale.y = parpadoTop2.scale.z = 1.01;
        parpadoTop2.position.x = 0.75;
        parpadoTop2.rotation.x = aberturaOjos;
        scene.add(parpadoTop2);
    });
    loader.load('/javascripts/parpado4.json', function(geometry, materials) {
        parpadoBottom2 = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
        parpadoBottom2.scale.x = parpadoBottom2.scale.y = parpadoBottom2.scale.z = 1.01;
        parpadoBottom2.position.x = 0.75;
        parpadoBottom2.rotation.x = -aberturaOjos;
        scene.add(parpadoBottom2);
    });
}

function agregarOjos(){
    var loader = new THREE.JSONLoader();
    loader.load('/javascripts/ojo3.json', function(geometry, materials) {
        ojoLeft = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
        ojoLeft.position.x = -0.75;
        ojoLeft.translation = THREE.GeometryUtils.center(geometry);
        scene.add(ojoLeft);
        //animacionNormal();
    });
    loader.load('/javascripts/ojo3.json', function(geometry, materials) {
        ojoRight = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
        ojoRight.position.x = 0.75;
        ojoRight.translation = THREE.GeometryUtils.center(geometry);
        scene.add(ojoRight);
    });
}

function agregarCorazon (){
    var loader = new THREE.JSONLoader();
    loader.load('/javascripts/heart.json', function(geometry, materials) {
        heartLeft = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
        heartLeft.scale.x = heartLeft.scale.y = heartLeft.scale.z = 0.1;
        heartLeft.position.x = -0.563;
        heartLeft.position.z = 2;
        heartLeft.translation = THREE.GeometryUtils.center(geometry);
    });
    loader.load('/javascripts/heart.json', function(geometry, materials) {
        heartRight = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
        heartRight.scale.x = heartRight.scale.y = heartRight.scale.z = 0.1;
        heartRight.position.x = 0.563;
        heartRight.position.z = 2;
        heartRight.translation = THREE.GeometryUtils.center(geometry);
    });
}

var socket = io.connect('158.97.91.164:8080', { 'forceNew': true });

socket.on('messages', function(data) {  
    console.log(data.tipo);
    var action = parseInt(data.tipo);
    switch(action){
        case 1: tweenNormal();
        break;
        case 2: 
        tweenNormal();
        tweenPensar();
        break;
        case 3: 
        tweenNormal();
        tweenTristeza();
        break;
        case 4: 
        tweenNormal();
        tweenAmor();
        break;
        default:
        break;
    }
});
