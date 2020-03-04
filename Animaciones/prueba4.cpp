// System calls
#include <unistd.h>
// Input/output streams and functions
#include <iostream>
// Included for sin() function.
#include <cmath>
// Interfaces with Everloop
#include "matrix_hal/everloop.h"
// Holds data for Everloop
#include "matrix_hal/everloop_image.h"
// Communicates with MATRIX device
#include "matrix_hal/matrixio_bus.h"

int main() {
// Create MatrixIOBus object for hardware communication
matrix_hal::MatrixIOBus bus;
// Initialize bus and exit program if error occurs
if (!bus.Init()) return false;
// Holds the number of LEDs on MATRIX device
int ledCount = bus.MatrixLeds();
// Create EverloopImage object, with size of ledCount
matrix_hal::EverloopImage everloop_image(ledCount);
// Create Everloop object
matrix_hal::Everloop everloop;
// Set everloop to use MatrixIOBus bus
everloop.Setup(&bus);
int a,j=0,defineTiempo=0,lapso=13,permanece=10,intensidadBlue=0,limite=150,d=0,counter=0,ledInicio=0,numLeds=3,aumenta=0;

while(1)
{
	for (matrix_hal::LedValue &led : everloop_image.leds){
		led.red=0;
		led.green=j>limite?limite:j;
		led.blue=intensidadBlue;
		 a=led.green;
	}
		
		std::cout << "color azul: " <<a<<std::endl;


	//if (counter<3)
	//for(int j=0;j<numLeds;j++){
	//	everloop_image.leds[ledInicio+((counter/7) % everloop_image.leds.size()+j)].green = 20;
	//	aumenta+=2;
//	}
	//va aumentando la intensidad del color verde
	if (defineTiempo>lapso && defineTiempo<=lapso*2){
		j+=3;
		d+=3;
	}
	//la intensidad el color verde permanece
	if (defineTiempo>(lapso*2) && defineTiempo<=(lapso*2+permanece)){
		j=j;
		d=d;
	}
	//if (defineTiempo>(lapso*2+permanece)&& defineTiempo<=(lapso*2+permanece+4))
		//d-=6;
	//va disminuyendo la intensidad del color verde
	if(defineTiempo>(lapso*2+permanece) && defineTiempo<=(lapso*3+permanece)){
		j-=3;
		d=0;
	}
	if(defineTiempo>(lapso*3+permanece)){
		j=0;
	    defineTiempo=0;
	    d=0;
	}
	//everloop_image.leds[0].green=0;
	everloop.Write(&everloop_image);
	counter++;
	defineTiempo++;
	

	usleep(40000);
}   
return 0;
}
