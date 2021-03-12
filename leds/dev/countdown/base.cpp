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
int temp = led;
int v = 5;
bool state = true;

for (int i = 0; i < 18; i++)
{
    everloop_image.leds[i].green = 0;
    everloop_image.leds[i].blue = 0;
    everloop_image.leds[i].red = 0;
}

everloop.Write(&everloop_image);	
usleep(40000*v);

for (int j = 0; j < 15; j++)
{
    //apaga todos antes de pintar otra vez
    for (int i = 0; i < 18; i++)
    {
        everloop_image.leds[i].green = 0;
        everloop_image.leds[i].blue = 0;
        everloop_image.leds[i].red = 0;
    }
    //donde ocurre la magia
    temp = led;
    for (int i = 0; i < 4; i++)
    {
        if (temp == ledInicio || temp == siguiente(ledInicio) || temp == siguiente(ledInicio + 1) || temp == siguiente(ledInicio + 2))
        {
            everloop_image.leds[temp].red = 255;
            everloop_image.leds[temp].green = 255;
            everloop_image.leds[temp].blue = 255;
        } else if (temp == siguiente(ledInicio + 3) || temp == siguiente(ledInicio + 4) || temp == siguiente(ledInicio + 5) || temp == siguiente(ledInicio + 6)){
            everloop_image.leds[temp].red = 255;
            everloop_image.leds[temp].green = 255;
            everloop_image.leds[temp].blue = 255;
        } else if (temp == siguiente(ledInicio + 7) || temp == siguiente(ledInicio + 8) || temp == siguiente(ledInicio + 9) || temp == siguiente(ledInicio + 10)){
            everloop_image.leds[temp].red = 255;
            everloop_image.leds[temp].green = 255;
            everloop_image.leds[temp].blue = 255;
        } else if (temp == siguiente(ledInicio + 11) || temp == siguiente(ledInicio + 12) || temp == siguiente(ledInicio + 13) || temp == siguiente(ledInicio + 14)){
            everloop_image.leds[temp].red = 255;
            everloop_image.leds[temp].green = 255;
            everloop_image.leds[temp].blue = 255;
        } else {
            everloop_image.leds[temp].red = 255;
            everloop_image.leds[temp].green = 255;
            everloop_image.leds[temp].blue = 255;
        }        
        temp = siguiente(temp);
    }
    led = siguiente(led);
    everloop.Write(&everloop_image);
    usleep(40000*v);
}

for (int j = 0; j < 18; j++)
{
    //donde ocurre la magia
    temp = led;
    for (int i = 0; i < 4; i++)
    {
        everloop_image.leds[temp].red = 255;
        everloop_image.leds[temp].green = 255;
        everloop_image.leds[temp].blue = 255;
        temp = siguiente(temp);
    }
led = siguiente(led);
everloop.Write(&everloop_image);
usleep(40000 * v);
}

//apaga los leds al final
for (int i = 0; i < 18; i++)
{
    everloop_image.leds[i].green = 0;
    everloop_image.leds[i].blue = 0;
    everloop_image.leds[i].red = 0;
}

everloop.Write(&everloop_image);	
usleep(40000*v);

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
