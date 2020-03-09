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
int ledInicio=frente(9);
int led = ledInicio;
int v = 5;
bool stage = false;
int etapa = 0;
int izq = led;
int der = led;

while (true)
{
    
    if (etapa == 0)
    {
        for (int i = 0; i < 18; i++)
        {
            everloop_image.leds[i].red = 0;
        }
        everloop_image.leds[led].green = 0;
        everloop_image.leds[led].blue = 0;
        everloop_image.leds[led].red = 0;
    }

    if (etapa % 2 == 0 && !stage)
        {
            everloop_image.leds[izq].red = 200;
            everloop_image.leds[der].red = 200;
            izq = anterior(izq);
            der = siguiente(der);
            everloop_image.leds[izq].red = 200;
            everloop_image.leds[der].red = 200;
        }
        else if (stage)
        {
            if (etapa % 2 == 0)
            {
                for (int i = 0; i < 18; i++)
                {
                    everloop_image.leds[i].red = 0;
                }
            }
            else {
                for (int i = 0; i < 18; i++)
                {
                    everloop_image.leds[i].red = 200;
                }
            }
        }
        else
        {
            everloop_image.leds[izq].red = 0;
            everloop_image.leds[der].red = 0;
        }
        etapa++;
        if (izq == der)
        {
            stage = true;
        }        
    
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
