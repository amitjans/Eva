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
// The following code is part of main()
// Holds the number of LEDs on MATRIX device
int ledCount = bus.MatrixLeds();
// Create EverloopImage object, with size of ledCount
matrix_hal::EverloopImage everloop_image(ledCount);
//matrix_hal::EverloopImage everloop_image(numLedsI);
// Create Everloop object
matrix_hal::Everloop everloop;
// Set everloop to use MatrixIOBus bus
everloop.Setup(&bus);
// Variables
int j=0, defineTiempo=0,band=0,lapso=13,permanece=10,ledInicio=15,intensidadRed=0,intensidadBlue=50,
limite=150,numLeds=5,num=0,TotalLeds=18,tmp;
//execution cycle
while(1) {
    //For each led in everloop_image.leds, set led value
    for (matrix_hal::LedValue &led : everloop_image.leds) {
    //Transicion del color verde
        tmp=ledInicio;
        for (int k=0;k<numLeds;k++){
            //Si la posicion excede el numero de leds, utiliza la posicion del primer led de la tarjeta
            if (ledInicio==TotalLeds)
            {
                ledInicio=num;
                everloop_image.leds[ledInicio].red=intensidadRed;
                everloop_image.leds[ledInicio].green=j>limite?limite:j;
                everloop_image.leds[ledInicio].blue=intensidadBlue;
            }
            else{
                everloop_image.leds[ledInicio].red=intensidadRed;
                everloop_image.leds[ledInicio].green=j>limite?limite:j;
                everloop_image.leds[ledInicio].blue=intensidadBlue;
            }
            ledInicio++;
        }
	ledInicio=tmp;
    }
    //Tiempos de transicion de azul a cian y de cian a azul 
    if (defineTiempo>lapso && defineTiempo<=lapso*2)
        j+=3;
    if (defineTiempo>(lapso*2) && defineTiempo<=(lapso*2+permanece))
        j=j;
    if (defineTiempo>(lapso*2+permanece) && defineTiempo<=(lapso*3+permanece))
        j-=3;
    if (defineTiempo>(lapso*3+permanece)){
        defineTiempo=0;
        j=0;
    }
    // Updates the LEDs
    everloop.Write(&everloop_image);
    defineTiempo++;
    // Sleep for 40000 microseconds
    usleep(40000);
}
return 0;
}
