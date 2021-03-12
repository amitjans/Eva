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
// Create Everloop object
matrix_hal::Everloop everloop;
// Set everloop to use MatrixIOBus bus
everloop.Setup(&bus);

// Keeps track of location of moving dots
long counter = 0;
int desplazamiento=8;

// 10 sec loop for rainbow effect 500*20000 microsec = 10 sec
for (int i = 0; ; i++) {
    // For each led in everloop_image.leds, set led value to 0
    for (matrix_hal::LedValue &led : everloop_image.leds) {
    // Turn off Everloop
    led.red = 0;
    led.green = 0;
    led.blue = 0;
    led.white = 0;
    }

    // Set led color per led
    for (int j = 0; j < desplazamiento; ++j)
    {
        everloop_image.leds[((counter + j)/ 7) % everloop_image.leds.size()].red = 40;
    }

    // Updates the Everloop on the MATRIX device
    everloop.Write(&everloop_image);
    // Increment counter
    if (i < 500)
    {
        counter++;   
    }
    if (i >= 500 && i < 1500)
    {
        counter--;
    }
    else
    {
        i=0;
    }

    // Sleep for 20000 microseconds
    usleep(20000);
}

// Updates the Everloop on the MATRIX device
everloop.Write(&everloop_image);

// For each led in everloop_image.leds, set led value to 0
for (matrix_hal::LedValue &led : everloop_image.leds) {
    // Turn off Everloop
    led.red = 0;
    led.green = 0;
    led.blue = 0;
    led.white = 0;
}

// Updates the Everloop on the MATRIX device
everloop.Write(&everloop_image);

return 0;
}
