//System calls
#include <unistd.h>
// Input/output streams and functions
#include <iostream>

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

// For each led in everloop_image.leds, set led value
for (matrix_hal::LedValue &led : everloop_image.leds) {
    led.red = 0;
    // Set green to 100
    led.green = 0;
    led.blue = 100;
    led.white = 0;
}

// Updates the Everloop on the MATRIX device
everloop.Write(&everloop_image);

// Output everloop status to console
std::cout << "Everloop set to green for 10 seconds." << std::endl;

for (int i = 0; i <= 10; i++) {
    // Output time remaining to console
    std::cout << "Time remaining (s) : " << 10 - i << std::endl;
    // Sleep for 1 second
    usleep(1000000);
}

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
