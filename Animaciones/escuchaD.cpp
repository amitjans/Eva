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
long counter=0;
int i=0,ledInicio=7,aumenta=0,colorApagado=0,numLeds=2,min=25,max=50;
while(1)
{
		for (matrix_hal::LedValue &led : everloop_image.leds){
			led.red=colorApagado;
			led.green=colorApagado;
			led.blue=colorApagado;
			led.white=colorApagado;
		}
		for(int j=0;j<numLeds;j++){
			everloop_image.leds[ledInicio+((counter/7) % everloop_image.leds.size()+j)].green = 20;
			aumenta+=2;
		}
		everloop.Write(&everloop_image);
		
		if (i < min){
			counter++;
			i++;
		}
		if(i >= min && i < max)
		{
			counter--;
			i++;
		}
		if(i >= max)
		{
			i=0;
		}
		usleep(20000);
		aumenta=0;
}   
return 0;
}
