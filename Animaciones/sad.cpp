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

int siguiente(int);
int anterior (int);

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
int ledInicio=9,tail=20,lizq=0,lder=0;

lizq = ledInicio;
lder = ledInicio;
// std::cout<<lizq<<std::endl;
// std::cout<<lder<<std::endl;
while(true)
{
	for (int i = 0; i < 18; i++)
	{
		if (everloop_image.leds[i].blue == 80)
		{
			everloop_image.leds[i].green = 0;
			everloop_image.leds[i].blue = 50;
			everloop_image.leds[i].red = 0;
		} else if (everloop_image.leds[i].blue == 50)
		{
			everloop_image.leds[i].green = 0;
			everloop_image.leds[i].blue = 35;
			everloop_image.leds[i].red = 0;
		} else {
			everloop_image.leds[i].green = 0;
			everloop_image.leds[i].blue = 0;
			everloop_image.leds[i].red = 0;
		}
	}
	if (lder <= siguiente(ledInicio + 6)){
		everloop_image.leds[lizq].green = 0;
		everloop_image.leds[lizq].blue = 80;
		everloop_image.leds[lizq].red = 0;
		everloop_image.leds[lder].green = 0;
		everloop_image.leds[lder].blue = 80;
		everloop_image.leds[lder].red = 0;
	}
	
	// std::cout<<lizq<<std::endl;
	// std::cout<<lder<<std::endl;

	if (lizq == lder && lizq != ledInicio)
	{
		lizq = ledInicio;
		lder = ledInicio;
	} else{
		lizq = anterior(lizq);
		lder = siguiente(lder);
	}

	everloop.Write(&everloop_image);	
	usleep(40000 * 7);
}   
return 0;
}

int siguiente(int value){
	return value + 1 >= 18 ? value - 17 : value + 1;
}

int anterior (int value){
	return value - 1 < 0 ? 18 + (value - 1) : value - 1;
}
