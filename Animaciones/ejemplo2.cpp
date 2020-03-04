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

// 10 sec loop for rainbow effect 500*20000 microsec = 10 sec
for (int i = 0; i <= 500; i++) {
    // For each led in everloop_image.leds, set led value to 0
    for (matrix_hal::LedValue &led : everloop_image.leds) {
    // Turn off Everloop
    led.red = 0;
    led.green = 0;
    led.blue = 0;
    led.white = 0;
    }

    // Set led color per led
    everloop_image.leds[(counter / 2) % everloop_image.leds.size()].red = 40;
    everloop_image.leds[(counter / 2) % everloop_image.leds.size()].blue = 40;
    everloop_image.leds[(counter / 7) % everloop_image.leds.size()].green = 60;
    everloop_image.leds[(counter / 11) % everloop_image.leds.size()].blue = 60;
    everloop_image
        .leds[everloop_image.leds.size() - 1 -
            (counter % everloop_image.leds.size())]
        .white = 20;

    // Updates the Everloop on the MATRIX device
    everloop.Write(&everloop_image);
    // Increment counter
    counter++;

    // If i is 0 (first run)
    if (i == 0) {
    // Output everloop status to console
    std::cout << "Everloop set to moving dots for 10 seconds." << std::endl;
    }
    // If i is cleanly divisible by 50
    if ((i % 50) == 0) {
    // Output time remaining to console
    std::cout << "Time remaining (s) : " << 10 - (i / 50) << std::endl;
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
