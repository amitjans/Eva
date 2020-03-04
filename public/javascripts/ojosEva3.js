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
var heartRight = null;
function animate() {
    
	requestAnimationFrame( animate );
    
    if (!heartRight) {
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


//setTimeout(function(){animacionNormal()},5000);

function animacionNormal(){
    if(!ojoLeft)
        return;
    /*var tween = new TWEEN.Tween(ojoLeft.rotation)
                .to({ y: -Math.PI/4}, 1000)
                .delay(1000)
                .onComplete(function() {
                    if (Math.abs(group.rotation.y)>=2*Math.PI) {
                        group.rotation.y = group.rotation.y % (2*Math.PI);
                    }
                })
                .start();*/
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
                        .to({x:cierreOjos},300)
                        .delay(3000)
                        .easing(TWEEN.Easing.Quadratic.In)
                        .onUpdate(update);
    
    animacionParpadeoArriba = new TWEEN.Tween(current)
                        .to({x:aberturaOjos},300)
                        .delay(0)
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
                            .to({x:-cierreOjos},300)
                            .delay(3000)
                            .easing(TWEEN.Easing.Quadratic.Out)
                            .onUpdate(update3);

        animacionParpadeoArriba3 = new TWEEN.Tween(current3)
                            .to({x:-aberturaOjos},300)
                            .delay(0)
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

//var animacionComplementaria, animacionComplementaria2, animacionOjos1, animacionOjos2, animacionOjos3; 
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


/*setTimeout(function(){
    tweenNormal();
    },20000);*/
//tweenSad();

function tweenSad(){
    iniciarTristeza = true;
    var current = {x: parpadoTop.rotation.x};
    var update = function(){
        parpadoTop.rotation.x = current.x;
        parpadoTop2.rotation.x = current.x;
    }
    var updateEye = function(){
        ojoRight.rotation.x = ojoLeft.rotation.x;
        ojoRight.rotation.y = ojoLeft.rotation.y;
    }
    cierreOjos=Math.PI;
    aberturaOjos = Math.PI/1.8;
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
                        })
                        .start();

    animacionOjos = new TWEEN.Tween(ojoLeft.rotation)
                        .to({x:Math.PI/6},1500)
                        .delay(0)
                        .easing(TWEEN.Easing.Elastic.InOut)
                        .onUpdate(updateEye);
    animacionOjos2 = new TWEEN.Tween(ojoLeft.rotation)
                        .to({y:-Math.PI/6},1500)
                        .delay(500)
                        .easing(TWEEN.Easing.Elastic.InOut)
                        .onUpdate(updateEye);
    animacionOjos3 = new TWEEN.Tween(ojoLeft.rotation)
                        .to({y:Math.PI/6},1500)
                        .delay(500)
                        .easing(TWEEN.Easing.Elastic.InOut)
                        .onUpdate(updateEye);
    animacionOjos4 = new TWEEN.Tween(ojoLeft.rotation)
                        .to({y:0},1500)
                        .delay(500)
                        .easing(TWEEN.Easing.Elastic.InOut)
                        .onUpdate(updateEye)
                        .onComplete(function(){
                            setTimeout(function(){
                                TWEEN.removeAll();
                                tweenNormal();
                            },1500)
                        });
    
    animacionOjos.chain(animacionOjos2);
    animacionOjos2.chain(animacionOjos3);
    animacionOjos3.chain(animacionOjos4);
    animacionOjos.start();    
}

function tweenThink(){
    iniciarPensando = true;
    var value = Math.PI/6;
    TWEEN.removeAll();
    aTop = new TWEEN.Tween(ojoLeft.rotation)
                        .to({x:-value,y:-value},2000)
                        .delay(0)
                        .easing(TWEEN.Easing.Elastic.InOut)
                        .onUpdate(function(){
                            ojoRight.rotation.x=ojoLeft.rotation.x;
                            ojoRight.rotation.y=ojoLeft.rotation.y;
                        })
                        .onComplete(function(){
                            tweenParpadeo();
                        });
    aRight = new TWEEN.Tween(ojoLeft.rotation)
                        .to({y:value},2000)
                        .delay(1000)
                        .easing(TWEEN.Easing.Elastic.InOut)
                        .onUpdate(function(){
                            ojoRight.rotation.y=ojoLeft.rotation.y;
                        });
    aLeft = new TWEEN.Tween(ojoLeft.rotation)
                        .to({y:-value},2000)
                        .delay(1000)
                        .easing(TWEEN.Easing.Elastic.InOut)
                        .onUpdate(function(){
                            ojoRight.rotation.y=ojoLeft.rotation.y;
                        });
    aBottom = new TWEEN.Tween(ojoLeft.rotation)
                        .to({x:0,y:0},2000)
                        .delay(1000)
                        .easing(TWEEN.Easing.Elastic.InOut)
                        .onUpdate(function(){
                            ojoRight.rotation.x=ojoLeft.rotation.x;
                            ojoRight.rotation.y=ojoLeft.rotation.y;
                        });
    aTop.chain(aRight);
    aRight.chain(aLeft);
    aLeft.chain(aBottom);
    aTop.start();
}

function tweenLove(){
    iniciaAmor = true;
    scene.add(heartLeft);
    scene.add(heartRight);
    ojoRight.rotation.x = Math.PI/2;
    ojoLeft.rotation.x = Math.PI/2;
    TWEEN.removeAll();
    var repeat = 0;
    animacionParpadeoArriba = new TWEEN.Tween(parpadoTop.rotation)
                        .to({x:aberturaOjos},500)
                        .delay(0)
                        .easing(TWEEN.Easing.Quadratic.Out)
                        .onUpdate(function(){
                            parpadoTop2.rotation.x = parpadoTop.rotation.x;
                        })
                        .start();
    animacionParpadeoAbajo = new TWEEN.Tween(parpadoBottom.rotation)
                        .to({x:-aberturaOjos},500)
                        .delay(0)
                        .easing(TWEEN.Easing.Quadratic.Out)
                        .onUpdate(function(){
                            parpadoBottom2.rotation.x = parpadoBottom.rotation.x;
                        })
                        .start();
    
    heartAnimation = new TWEEN.Tween(heartLeft.scale)
                        .to({x:0.1,y:0.1,z:0.1},2000)
                        .delay(0)
                        .easing(TWEEN.Easing.Elastic.In)
                        .onUpdate(function(){
                            heartRight.scale.x=heartLeft.scale.x;
                            heartRight.scale.y=heartLeft.scale.y;
                            heartRight.scale.z=heartLeft.scale.z;
                        })
                        .onComplete(function(){
                            heartBeat = new TWEEN.Tween(heartLeft.scale)
                                                .to({x:0.13,y:0.13,z:0.13},1300)
                                                .delay(0)
                                                .easing(TWEEN.Easing.Elastic.In)
                                                .onUpdate(function(){
                                                    heartRight.scale.x=heartLeft.scale.x;
                                                    heartRight.scale.y=heartLeft.scale.y;
                                                    heartRight.scale.z=heartLeft.scale.z;
                                                });
                            heartBeat2 = new TWEEN.Tween(heartLeft.scale)
                                                .to({x:0.1,y:0.1,z:0.1},1300)
                                                .delay(0)
                                                .easing(TWEEN.Easing.Elastic.Out)
                                                .onUpdate(function(){
                                                    heartRight.scale.x=heartLeft.scale.x;
                                                    heartRight.scale.y=heartLeft.scale.y;
                                                    heartRight.scale.z=heartLeft.scale.z;
                                                })
                                                .onComplete(function(){
                                                    repeat++;
                                                    if(repeat>3){
                                                        setTimeout(function(){
                                                                TWEEN.removeAll();
                                                                tweenNormal();
                                                            },1000);    
                                                    }        
                                                });
                            heartBeat.chain(heartBeat2);
                            heartBeat2.chain(heartBeat);
                            heartBeat.start();
                        
                        })
                        .start();
}


var engagement=false;
function tweenEngagement(){
    //TWEEN.removeAll();
    engagement = true;
    var current = {x:aberturaOjos};
    var update	= function(){
		parpadoTop.rotation.x = current.x;
        parpadoTop2.rotation.x = current.x;
	}
    ojoLeft.rotation.y = Math.PI;
    ojoRight.rotation.y = Math.PI;
    var repeat = 0;
    scaleLeftEye1 = new TWEEN.Tween(ojoLeft.scale)
                        .to({x:0.9,y:0.9,z:0.9},2000)
                        .delay(0)
                        .easing(TWEEN.Easing.Elastic.InOut)
                        .onUpdate(function(){
                            parpadoTop.scale.x = parpadoTop.scale.y = parpadoTop.scale.z = ojoLeft.scale.x+0.01;
                            parpadoBottom.scale.x = parpadoBottom.scale.y = parpadoBottom.scale.z = ojoLeft.scale.x+0.01;
                        })
                        .onComplete(function(){
                            
                        });
    scaleLeftEye2 = new TWEEN.Tween(ojoLeft.scale)
                        .to({x:1.1,y:1.1,z:1.1},2000)
                        .delay(500)
                        .easing(TWEEN.Easing.Elastic.InOut)
                        .onUpdate(function(){
                            parpadoTop.scale.x = parpadoTop.scale.y = parpadoTop.scale.z = ojoLeft.scale.x+0.01;
                            parpadoBottom.scale.x = parpadoBottom.scale.y = parpadoBottom.scale.z = ojoLeft.scale.x+0.01;
                        })
                        .onComplete(function(){
                            repeat++;
                            if(repeat>1){
                                setTimeout(function(){
                                    TWEEN.removeAll();
                                    tweenNormal();
                                },1000);
                            }
                        });
    scaleLeftEye1.chain(scaleLeftEye2);
    scaleLeftEye2.chain(scaleLeftEye1);
    scaleLeftEye1.start();
    
    scaleRightEye1 = new TWEEN.Tween(ojoRight.scale)
                        .to({x:1.1,y:1.1,z:1.1},2000)
                        .delay(0)
                        .easing(TWEEN.Easing.Elastic.InOut)
                        .onUpdate(function(){
                            parpadoTop2.scale.x = parpadoTop2.scale.y = parpadoTop2.scale.z = ojoRight.scale.x+0.01;
                            parpadoBottom2.scale.x = parpadoBottom2.scale.y = parpadoBottom2.scale.z = ojoRight.scale.x+0.01;
                        });
    scaleRightEye2 = new TWEEN.Tween(ojoRight.scale)
                        .to({x:0.9,y:0.9,z:0.9},2000)
                        .delay(500)
                        .easing(TWEEN.Easing.Elastic.InOut)
                        .onUpdate(function(){
                            parpadoTop2.scale.x = parpadoTop2.scale.y = parpadoTop2.scale.z = ojoRight.scale.x+0.01;
                            parpadoBottom2.scale.x = parpadoBottom2.scale.y = parpadoBottom2.scale.z = ojoRight.scale.x+0.01;
                        });
    scaleRightEye1.chain(scaleRightEye2);
    scaleRightEye2.chain(scaleRightEye1);
    scaleRightEye1.start();
} 

var fear = false;
function tweenFear(){
    fear = true;
    var repeat = 0;
    ojoLeft.rotation.y = Math.PI;
    ojoRight.rotation.y = Math.PI;
    parpadoTop.scale.x = parpadoTop.scale.y = parpadoTop.scale.z = 1.015;
    parpadoTop2.scale.x = parpadoTop2.scale.y = parpadoTop2.scale.z = 1.015;
    parpadoBottom.scale.x = parpadoBottom.scale.y = parpadoBottom.scale.z = 1.015;
    parpadoBottom2.scale.x = parpadoBottom2.scale.y = parpadoBottom2.scale.z = 1.015;
    fearAnimation = new TWEEN.Tween(ojoLeft.scale)
                        .to({x:1.005, y:1.005,z:1.005},1)
                        .delay(0)
                        .easing(TWEEN.Easing.Quadratic.In)
                        .onUpdate(function(){
                            ojoRight.scale.x = ojoRight.scale.y = ojoRight.scale.z = ojoLeft.scale.x;
                        });
    fearAnimation2 = new TWEEN.Tween(ojoLeft.scale)
                        .to({x:0.995, y:0.995,z:0.995},1)
                        .delay(0)
                        .easing(TWEEN.Easing.Quadratic.Out)
                        .onUpdate(function(){
                            ojoRight.scale.x = ojoRight.scale.y = ojoRight.scale.z = ojoLeft.scale.x;
                        })
                        .onComplete(function(){
                            repeat++;
                            if(repeat > 2000){
                                setTimeout(function(){
                                    TWEEN.remove(fearAnimation);
                                    TWEEN.remove(fearAnimation2);
                                    tweenNormal();
                                },1000);
                            }
                        });
    fearAnimation.chain(fearAnimation2);
    fearAnimation2.chain(fearAnimation);
    fearAnimation.start();
}

var happy = false;

function tweenHappy(){
    happy = true;
    ojoLeft.rotation.y = Math.PI;
    ojoRight.rotation.y = Math.PI;
    
    setTimeout(function(){
        tweenNormal();
    },5000);
}
function tweenNormal(){

    var current = {x: parpadoTop.rotation.x};
    var update = function(){
        parpadoTop.rotation.x = current.x;
        parpadoTop2.rotation.x = current.x;
    }
    cierreOjos=Math.PI/2;
    aberturaOjos = Math.PI/4;
    
    if(iniciarTristeza){
        iniciarTristeza=false;
        animacionNormal=new TWEEN.Tween(parpadoTop.rotation)
                        .to({x:aberturaOjos},2500)
                        .delay(0)
                        .easing(TWEEN.Easing.Elastic.InOut)
                        .onUpdate(function(){
                            console.log('update aC');
                            parpadoTop2.rotation.x = parpadoTop.rotation.x;
                        })
                        .onComplete(function(){
                            console.log('update aC');
                        })
                        .start();
        animacionNormal2=new TWEEN.Tween(parpadoBottom.rotation)
                            .to({x:-aberturaOjos},2500)
                            .delay(0)
                            .easing(TWEEN.Easing.Elastic.InOut)
                            .onUpdate(function(){parpadoBottom2.rotation.x=parpadoBottom.rotation.x;})
                            .onComplete(function(){
                                //TWEEN.remove(animacionComplementaria2);
                                tweenParpadeo();
                                console.log('onComplete');
                                //scene.remove(parpadoBottom);
                                //scene.remove(parpadoBottom2); 
                            })
                            .start();
        animacionOjos = new TWEEN.Tween(ojoLeft.rotation)
                            .to({x:0},2500)
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
        heartDissapear = new TWEEN.Tween(heartLeft.scale)
                        .to({x:0.01,y:0.01,z:0.01},500)
                        .delay(0)
                        .easing(TWEEN.Easing.Quadratic.Out)
                        .onUpdate(function(){
                            heartRight.scale.x=heartLeft.scale.x;
                            heartRight.scale.y=heartLeft.scale.y;
                            heartRight.scale.z=heartLeft.scale.z;
                        })
                        .onComplete(function(){
                            ojoRight.rotation.x = 0;
                            ojoLeft.rotation.x = 0;
                            scene.remove(heartLeft);
                            scene.remove(heartRight);
                            tweenParpadeo();
                        })
                        .start();
    }
    
    if(engagement){
        engagement = false;
        scaleRightEye = new TWEEN.Tween(ojoRight.scale)
                        .to({x:1.0,y:1.0,z:1.0},3000)
                        .delay(0)
                        .easing(TWEEN.Easing.Elastic.InOut)
                        .onUpdate(function(){
                            parpadoTop2.scale.x = parpadoTop2.scale.y = parpadoTop2.scale.z = ojoRight.scale.x+0.01;
                            parpadoBottom2.scale.x = parpadoBottom2.scale.y = parpadoBottom2.scale.z = ojoRight.scale.x+0.01;
                        })
                        .start();
        scaleLeftEye1 = new TWEEN.Tween(ojoLeft.scale)
                        .to({x:1.0,y:1.0,z:1.0},3000)
                        .delay(0)
                        .easing(TWEEN.Easing.Elastic.InOut)
                        .onUpdate(function(){
                            parpadoTop.scale.x = parpadoTop.scale.y = parpadoTop.scale.z = ojoLeft.scale.x+0.01;
                            parpadoBottom.scale.x = parpadoBottom.scale.y = parpadoBottom.scale.z = ojoLeft.scale.x+0.01;
                        })
                        .onComplete(function(){
                            ojoLeft.rotation.y = 0;
                            ojoRight.rotation.y = 0;
                            tweenParpadeo(); 
                        })
                        .start();
    }
    
    if(fear){
        fear = false;
        ojoLeft.rotation.y = 0;
        ojoRight.rotation.y = 0;
        parpadoTop.scale.x = parpadoTop.scale.y = parpadoTop.scale.z = 1.01;
        parpadoTop2.scale.x = parpadoTop2.scale.y = parpadoTop2.scale.z = 1.01;
        parpadoBottom.scale.x = parpadoBottom.scale.y = parpadoBottom.scale.z = 1.01;
        parpadoBottom2.scale.x = parpadoBottom2.scale.y = parpadoBottom2.scale.z = 1.01;
        ojoLeft.scale.x = ojoLeft.scale.y = ojoLeft.scale.z = 1.0;
        ojoRight.scale.x = ojoRight.scale.y = ojoRight.scale.z = ojoLeft.scale.x;
        //tweenParpadeo();
    }
    
    if(happy){
        happy = false;
        ojoLeft.rotation.y = 0;
        ojoRight.rotation.y = 0;  
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
    },8000);

*/
var iniciaAmor=false;

function tweenAmor(){
    iniciaAmor = true;
    
    scene.add(heartLeft);
    scene.add(heartRight);
    TWEEN.removeAll();
    ojoRight.rotation.x = Math.PI;
    ojoLeft.rotation.x = Math.PI;
    aTop = new TWEEN.Tween(heartLeft.scale)
                        .to({x:0.17,y:0.17,z:0.17},1000)
                        .delay(0)
                        .easing(TWEEN.Easing.Elastic.In)
                        .onUpdate(function(){
                            heartRight.scale.x=heartLeft.scale.x;
                            heartRight.scale.y=heartLeft.scale.y;
                            heartRight.scale.y=heartLeft.scale.y;
                        });
    aRight = new TWEEN.Tween(heartLeft.scale)
                        .to({x:0.12,y:0.12,z:0.12},1000)
                        .delay(1)
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

var scaleLeftEye1, scaleLeftEye2, scaleRightEye1, scaleRightEye2;

function tweenEngagement2(){
    //TWEEN.removeAll();
    ojoLeft.rotation.y = Math.PI;
    ojoRight.rotation.y = Math.PI;
    scaleLeftEye1 = new TWEEN.Tween(ojoLeft.scale)
                        .to({x:0.8,y:0.8,z:0.8},3000)
                        .delay(1000)
                        .easing(TWEEN.Easing.Elastic.InOut)
                        .onUpdate(function(){
                            parpadoTop.scale.x = parpadoTop.scale.y = parpadoTop.scale.z = ojoLeft.scale.x+0.01;
                            parpadoBottom.scale.x = parpadoBottom.scale.y = parpadoBottom.scale.z = ojoLeft.scale.x+0.01;
                        })
                        .onComplete(function(){
                            //ojoLeft.rotation.x += Math.PI;
                            ojoLeft.rotation.y = Math.PI;
                            ojoRight.rotation.y = Math.PI;
                        });
    scaleLeftEye2 = new TWEEN.Tween(ojoLeft.scale)
                        .to({x:1.1,y:1.1,z:1.1},3000)
                        .delay(1000)
                        .easing(TWEEN.Easing.Elastic.InOut)
                        .onUpdate(function(){
                            parpadoTop.scale.x = parpadoTop.scale.y = parpadoTop.scale.z = ojoLeft.scale.x+0.01;
                            parpadoBottom.scale.x = parpadoBottom.scale.y = parpadoBottom.scale.z = ojoLeft.scale.x+0.01;
                        });
    scaleLeftEye1.chain(scaleLeftEye2);
    scaleLeftEye2.chain(scaleLeftEye1);
    scaleLeftEye1.start();
    
    scaleRightEye1 = new TWEEN.Tween(ojoRight.scale)
                        .to({x:1.1,y:1.1,z:1.1},3000)
                        .delay(1000)
                        .easing(TWEEN.Easing.Elastic.InOut)
                        .onUpdate(function(){
                            parpadoTop2.scale.x = parpadoTop2.scale.y = parpadoTop2.scale.z = ojoRight.scale.x+0.01;
                            parpadoBottom2.scale.x = parpadoBottom2.scale.y = parpadoBottom2.scale.z = ojoRight.scale.x+0.01;
                        });
    scaleRightEye2 = new TWEEN.Tween(ojoRight.scale)
                        .to({x:0.8,y:0.8,z:0.8},3000)
                        .delay(1000)
                        .easing(TWEEN.Easing.Elastic.InOut)
                        .onUpdate(function(){
                            parpadoTop2.scale.x = parpadoTop2.scale.y = parpadoTop2.scale.z = ojoRight.scale.x+0.01;
                            parpadoBottom2.scale.x = parpadoBottom2.scale.y = parpadoBottom2.scale.z = ojoRight.scale.x+0.01;
                        });
    scaleRightEye1.chain(scaleRightEye2);
    scaleRightEye2.chain(scaleRightEye1);
    scaleRightEye1.start();
} 



function tweenFeliz(){
    //TWEEN.removeAll();
    //ojoLeft.rotation.y = Math.PI/12;
    //ojoRight.rotation.y = -Math.PI/12;
    //parpadoTop.rotation.x += Math.PI/2;
    ojoLeft.scale.x = 0.7;
    ojoRight.scale.x = 0.7;
    ojoLeft.rotation.z = -Math.PI/12;
    ojoRight.rotation.z = Math.PI/12;
    parpadoTop.scale.x = 0.7;
    parpadoTop.rotation.y = -Math.PI/16;
    parpadoTop.rotation.z = -Math.PI/16;
    parpadoTop.position.z = 0.1;
    parpadoBottom.scale.x = 0.7;
    parpadoBottom.rotation.y = Math.PI/16;
    //parpadoBottom.rotation.z = Math.PI;
    parpadoBottom.position.z = 0.19;
    parpadoTop2.scale.x = 0.7;
    parpadoTop2.rotation.y = Math.PI/16;
    parpadoTop2.rotation.z = Math.PI/16;
    parpadoTop2.position.z = 0.1;
    parpadoBottom2.scale.x = 0.7;
    parpadoBottom2.rotation.y = -Math.PI/16;
    //parpadoBottom.rotation.z = Math.PI;
    parpadoBottom2.position.z = 0.19;
}
var parpado = null;
var tamEye = 1.0;
function agregarParpados() {
    var loader = new THREE.JSONLoader();
    
    loader.load('/javascripts/parpadoBueno2.json', function(geometry, materials) {
        parpadoTop = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
        parpadoTop.scale.x = parpadoTop.scale.y = parpadoTop.scale.z = 1.01;
        parpadoTop.position.x = -0.75;
        parpadoTop.rotation.x = aberturaOjos;
        scene.add(parpadoTop);
        tweenParpadeo();
    });
    loader.load('/javascripts/parpadoBueno2.json', function(geometry, materials) {
        parpadoBottom = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
        parpadoBottom.scale.x = parpadoBottom.scale.y = parpadoBottom.scale.z = 1.01;
        parpadoBottom.position.x = -0.75;
        parpadoBottom.rotation.x = -aberturaOjos;
        scene.add(parpadoBottom);
    });
    loader.load('/javascripts/parpadoBueno2.json', function(geometry, materials) {
        parpadoTop2 = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
        parpadoTop2.scale.x = parpadoTop2.scale.y = parpadoTop2.scale.z = 1.01;
        parpadoTop2.position.x = 0.75;
        parpadoTop2.rotation.x = aberturaOjos;
        scene.add(parpadoTop2);
    });
    loader.load('/javascripts/parpadoBueno2.json', function(geometry, materials) {
        parpadoBottom2 = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
        parpadoBottom2.scale.x = parpadoBottom2.scale.y = parpadoBottom2.scale.z = 1.01;
        parpadoBottom2.position.x = 0.75;
        parpadoBottom2.rotation.x = -aberturaOjos;
        scene.add(parpadoBottom2);
    });
}

function agregarOjos(){
    var loader = new THREE.JSONLoader();
    loader.load('/javascripts/ojo7.json', function(geometry, materials) {
        ojoLeft = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
        ojoLeft.position.x = -0.75;
        //ojoLeft.rotation.y = Math.PI;
        ojoLeft.translation = THREE.GeometryUtils.center(geometry);
        scene.add(ojoLeft);
        //animacionNormal();
    });
    loader.load('/javascripts/ojo7.json', function(geometry, materials) {
        ojoRight = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
        ojoRight.position.x = 0.75;
        //ojoRight.rotation.y = Math.PI;
        ojoRight.translation = THREE.GeometryUtils.center(geometry);
        scene.add(ojoRight);
    });
}

function agregarCorazon (){
    var loader = new THREE.JSONLoader();
    loader.load('/javascripts/heart.json', function(geometry, materials) {
        heartLeft = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
        heartLeft.scale.x = heartLeft.scale.y = heartLeft.scale.z = 0.02;
        heartLeft.position.x = -0.563;
        heartLeft.position.z = 2;
        heartLeft.translation = THREE.GeometryUtils.center(geometry);
        //scene.add(heartLeft);
        //animacionNormal();
    });
    loader.load('/javascripts/heart.json', function(geometry, materials) {
        heartRight = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
        heartRight.scale.x = heartRight.scale.y = heartRight.scale.z = 0.02;
        heartRight.position.x = 0.563;
        heartRight.position.z = 2;
        heartRight.translation = THREE.GeometryUtils.center(geometry);
        //scene.add(heartRight);
        //animacionNormal();
    });
}
