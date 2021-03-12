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
int j=0,defineTiempo=0,lapso=13,permanece=10,intensidadBlue=50,limite=150,d=0,band=0,ledInicio1=2,ledInicio2=8,ledInicio3=4,ledInicio4=10;
int turno=1;
while(1)
{
	for (matrix_hal::LedValue &led : everloop_image.leds){
		//if (band){
		led.green=20;
		led.green=10;
			switch(turno){
				case 1: everloop_image.leds[ledInicio1].green=0;
					everloop_image.leds[12].green=0;
					everloop_image.leds[ledInicio1].blue=0;
					everloop_image.leds[12].blue=0;break;
				case 2: everloop_image.leds[ledInicio2].green=0;
					everloop_image.leds[16].green=0;
					everloop_image.leds[ledInicio2].blue=0;
					everloop_image.leds[16].blue=0;
					break;
				case 3: everloop_image.leds[ledInicio3].green=0;
                                        everloop_image.leds[ledInicio3].blue=0;
					everloop_image.leds[14].green=0;
					everloop_image.leds[14].blue=0;
					break;
				case 4: everloop_image.leds[ledInicio4].green=0;
					everloop_image.leds[ledInicio4].blue=0;
					everloop_image.leds[18].green=0;
					everloop_image.leds[18].blue=0;
					turno=1;
					break;
	//			default: everloop_image.leds[ledInicio1].green=limite-d;
			}
			turno++;
			band=0;
//		}
//		else{
//			led.green=j>limite?limite:j;
//			led.blue=intensidadBlue;
//		}
	}
	if(defineTiempo>lapso && defineTiempo<=lapso*2){
		j+=3;
		//d+=5;
	}
	if(defineTiempo>(lapso*2) && defineTiempo<=(lapso*2+permanece)){
		j=j;
	}
	if(defineTiempo>(lapso*2+permanece) && defineTiempo<=(lapso*3+permanece)){
		j-=3;
		band=1;
		//d-=5;
	}
	if(defineTiempo>(lapso*3+permanece)){
		j=0;
	    defineTiempo=0;
	}
	everloop.Write(&everloop_image);
	defineTiempo++;
	usleep(40000);
}   
return 0;
}
