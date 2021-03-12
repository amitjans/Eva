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
int ledInicio=frente(4);
int led = ledInicio;
int v = 5;
bool state = true;

for (int i = 0; i < 18; i++)
{
    everloop_image.leds[i].green = 0;
    everloop_image.leds[i].blue = 50;
    everloop_image.leds[i].red = 0;
}

everloop.Write(&everloop_image);	
usleep(40000*v);

for (int i = 0; i < 18; i++)
{
    everloop_image.leds[led].green = 0;
    everloop_image.leds[led].blue = 0;
    everloop_image.leds[led].red = 0;

    led = siguiente(led);
    everloop.Write(&everloop_image);	
    usleep(40000*v);
}


// for (int i = 0; i < 8; i++)
// {
//     everloop_image.leds[ledInicio].green = state ? 255 : 0;
//     everloop_image.leds[ledInicio].blue = state ? 255 : 0;
//     everloop_image.leds[ledInicio].red = state ? 255 : 0;

//     everloop_image.leds[siguiente(ledInicio)].green = state ? 255 : 0;
//     everloop_image.leds[siguiente(ledInicio)].blue = state ? 255 : 0;
//     everloop_image.leds[siguiente(ledInicio)].red = state ? 255 : 0;

//     everloop_image.leds[siguiente(ledInicio + 1)].green = state ? 255 : 0;
//     everloop_image.leds[siguiente(ledInicio + 1)].blue = state ? 255 : 0;
//     everloop_image.leds[siguiente(ledInicio + 1)].red = state ? 255 : 0;

//     everloop_image.leds[siguiente(ledInicio + 2)].green = state ? 255 : 0;
//     everloop_image.leds[siguiente(ledInicio + 2)].blue = state ? 255 : 0;
//     everloop_image.leds[siguiente(ledInicio + 2)].red = state ? 255 : 0;

//     everloop_image.leds[siguiente(ledInicio + 3)].green = state ? 255 : 0;
//     everloop_image.leds[siguiente(ledInicio + 3)].blue = state ? 255 : 0;
//     everloop_image.leds[siguiente(ledInicio + 3)].red = state ? 255 : 0;

//     state = !state;

//     everloop.Write(&everloop_image);	
//     usleep(40000*v);
// }
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
