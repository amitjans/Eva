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
int frente(int);

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
int ledInicio=0,lder=0,j=-1,v=0;
lder = frente(ledInicio);
while(true)
{
	if (j == -1)
    {
        v = 10;
        for (int i = 0; i < 18; i++)
        {
            everloop_image.leds[i].green = 0;
            everloop_image.leds[i].blue = 0;
            everloop_image.leds[i].red = 0;
        }
        everloop_image.leds[ledInicio].red = 100;
		everloop_image.leds[ledInicio].green = 100;
        everloop_image.leds[anterior(ledInicio)].red = 100;
		everloop_image.leds[anterior(ledInicio)].green = 100;
        everloop_image.leds[lder].red = 100;
		everloop_image.leds[lder].green = 100;
        everloop_image.leds[anterior(lder)].red = 100;
		everloop_image.leds[anterior(lder)].green = 100;
    } else if (j >= 0 && j < 4) {
        everloop_image.leds[anterior(ledInicio - j-1)].red = 100;
		everloop_image.leds[anterior(ledInicio - j-1)].green = 100;
        everloop_image.leds[siguiente(ledInicio + j)].red = 100;
		everloop_image.leds[siguiente(ledInicio + j)].green = 100;
        everloop_image.leds[anterior(lder - j-1)].red = 100;
		everloop_image.leds[anterior(lder - j-1)].green = 100;
        everloop_image.leds[siguiente(lder + j)].red = 100;
		everloop_image.leds[siguiente(lder + j)].green = 100;
    } else {
        v = 7;
        for (int i = 0; i < 18; i++)
        {
            everloop_image.leds[i].green = (j + i) % 2 == 0 ? 100 : 10;
            everloop_image.leds[i].blue = 0;
            everloop_image.leds[i].red = (j + i) % 2 == 0 ? 100 : 10;
        }
        if (j > 8)
        {
            j = -2;
        }
        
    }
    j++;
	everloop.Write(&everloop_image);	
	usleep(40000*v);
}   
return 0;
}

int siguiente(int value){
	return value + 1 >= 18 ? value - 17 : value + 1;
}

int anterior (int value){
	return value - 1 < 0 ? 18 + (value - 1) : value - 1;
}

int frente (int value){
	return siguiente(value + 8);
}
